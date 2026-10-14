"""Reconcile clinical CSV sources for draft directory profiles, never publishes."""
import csv,json,re,hashlib,unicodedata,sys
from pathlib import Path
from urllib.parse import urlparse
from collections import Counter
base=Path(sys.argv[1]);files=['InPersonClinics.csv','peptide_hormone_market_census_v5.csv','peptide_hormone_market_census_v3.csv','peptide_hormone_market_census_v2.csv','peptide_hormone_market_census.csv']
missing={'','not on file','pending audit','not publicly listed.','not publicly listed','unknown','not stated','none','n/a','—','-'}
def clean(s):return s.strip() if s.strip().lower() not in missing else ''
def norm(s):return re.sub(r'[^a-z0-9]+',' ',unicodedata.normalize('NFKD',s).encode('ascii','ignore').decode().lower()).strip()
clinical=re.compile(r'\b(clinic|medical|medspa|med spa|healthcare|physician|doctor|practice|compounding pharmacy|wellness center|health center|health centre|hormone therapy|testosterone replacement|telehealth|fertility|nurse)\b',re.I)
retail=re.compile(r'research.use.only|research chemical|research peptide (supplier|retailer)|supplement (store|retailer)|SARMs (supplier|retailer)|marketplace|affiliate',re.I)
records={};held=[];counts={};duplicates=0;known_names={}
for filename in files:
 with (base/filename).open(encoding='utf-8-sig',newline='') as f:rows=list(csv.DictReader(f))
 counts[filename]=len(rows)
 for index,r in enumerate(rows,2):
  assert None not in r and r.get('vendor_name'),'Malformed CSV'
  name=r['vendor_name'].strip();text=name+' '+r['about_summary'];dedicated=filename=='InPersonClinics.csv'
  if not dedicated and (retail.search(text) or not clinical.search(text)):
   held.append({'file':filename,'row':index,'name':name,'reason':'Not clearly a clinical provider; category review required'});continue
  location=clean(r['address']);n=norm(name);a=norm(location);key=(n,a)
  # Prefer dedicated/latest records; missing-location rows do not create another profile for a known name.
  if not a and n in known_names:
   key=known_names[n][0]
  elif a and (n,'') in records:
   key=(n,'');records[key]['location']=location
  if key in records:
   duplicates+=1;prior=records[key];sources=json.loads(prior['profile']);sourcefiles=sources.get('sourceFiles','').split('; ')
   if filename not in sourcefiles:sourcefiles.append(filename)
   sources['sourceFiles']='; '.join(sourcefiles)
   if not prior['website'] and clean(r['website_url']):prior['website']=clean(r['website_url'])
   prior['profile']=json.dumps(sources,ensure_ascii=False);continue
  w=clean(r['website_url']);u=urlparse(w)
  if w and (u.scheme not in ('https','http') or not u.hostname or u.username or u.password):w=''
  director=clean(r['medical_director']);fmt=r['fulfillment']
  fmt={'In-Person':'In-person','In-person clinic':'In-person','Online':'Online / telehealth'}.get(fmt,fmt)
  profile={'overview':name+' is listed as a clinical provider in the supplied dataset. Services and care format are source-reported; Source Standard has not independently evaluated this clinic.','Clinical services':clean(r['clinical_focus']) or 'Not provided','Care format':clean(fmt) or 'Not provided','Medical director · source-reported':director or 'Not provided','Facility locations':location or 'Not provided','sourceFiles':filename,'sourceReviewId':clean(r['review_id']),'sourceReportedDate':clean(r['last_reviewed'])}
  identity='clinic-'+re.sub(r'[^a-z0-9]+','-',n).strip('-')[:55]+'-'+hashlib.sha256((n+'|'+a).encode()).hexdigest()[:10]
  records[key]={'id':identity,'name':name,'kind':'clinics','website':w,'location':location,'category':clean(r['category']) or 'Clinical provider','source':'User-supplied clinic datasets; details not independently rechecked','source_url':'','source_date':('Source reports last reviewed: '+clean(r['last_reviewed'])) if clean(r['last_reviewed']) else 'Original research date not supplied','status':'Not verified by Source Standard','profile':json.dumps(profile,ensure_ascii=False)}
  known_names.setdefault(n,[]).append(key)
result=list(records.values());assert len({r['id'] for r in result})==len(result)
Path('data/unverified-clinics.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
Path('data/clinic-import-review.json').write_text(json.dumps({'source_counts':counts,'unique_profiles':len(result),'overlapping_rows_reconciled':duplicates,'held_rows':held},ensure_ascii=False,indent=2)+'\n')
cols=list(result[0]);q=lambda x:"'"+x.replace("'","''")+"'"
Path('/private/tmp/source-standard-clinics-local.sql').write_text('\n'.join('INSERT INTO directory ('+','.join(cols)+') VALUES ('+','.join(q(r[c]) for c in cols)+') ON CONFLICT(id) DO NOTHING;' for r in result)+'\n')
print(json.dumps({'source_rows':sum(counts.values()),'unique_profiles':len(result),'overlaps_reconciled':duplicates,'held_rows':len(held),'care_formats':dict(Counter(json.loads(r['profile'])['Care format'] for r in result))}))
