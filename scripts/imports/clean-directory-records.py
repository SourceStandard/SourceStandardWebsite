"""Reversible local publication-quality gate. Original supplied files are never modified."""
import json,re,collections
from pathlib import Path
from urllib.parse import urlparse
root=Path(__file__).resolve().parents[2]
audit=root/'data'/'quality-review';audit.mkdir(exist_ok=True)
excluded=[];changes=[];sql=[];counts={}
third_party={'yelp.com','zocdoc.com','kompass.com','accio.com','ebay.com','etsy.com','amazon.com','amazon.ca','globalsources.com','made-in-china.com','allegro.pl','chamberofcommerce.com','chandlerchamber.com','healthgrades.com','yellowpages.com','mapquest.com','facebook.com','instagram.com','linkedin.com'}
def external_listing(url):
 h=urlparse(url).netloc.lower().removeprefix('www.')
 return any(h==d or h.endswith('.'+d) for d in third_party)
def quote(s):return "'"+str(s).replace("'","''")+"'"
for file in ['unverified-public-companies','unverified-facilities','unverified-clinics']:
 path=root/'data'/f'{file}.json';backup=audit/f'{file}-before-cleanup.json'
 if not backup.exists():backup.write_text(path.read_text())
 rows=json.loads(backup.read_text());kept=[];seen={};reasons=collections.Counter()
 for row in rows:
  p=json.loads(row['profile']);reason=''
  if row['kind']=='vendors' and re.search('affiliate|informational|marketplace',row['category'],re.I):reason='Not a direct research-use-only vendor; marketplace or information listing'
  elif row['website'] and external_listing(row['website']):reason='Third-party listing supplied instead of an official organization website; identity needs review'
  elif row['kind'] in ['vendors','manufacturers'] and not row['website'] and p.get('instagramStatus')!='Confirmed':reason='No official website or source-confirmed social account supplied; identity needs review'
  elif row['name'].strip().lower() in ['zocdoc']:reason='Directory service rather than a clinical provider'
  name=re.sub(r'[^a-z0-9]','',row['name'].lower());loc=re.sub(r'[^a-z0-9]','',row['location'].lower());key=(row['kind'],name,loc)
  if not reason and key in seen:reason=f'Duplicate organization name and location; retained {seen[key]}'
  if reason:
   excluded.append({'record':row,'reason':reason});reasons[reason.split(';')[0]]+=1
   sql.append(f"DELETE FROM directory WHERE id={quote(row['id'])} AND status='Not verified by Source Standard';")
   continue
  seen[key]=row['id'];old=row.copy();row['name']=re.sub(r'\s*\((?:Instagram seller|marketplace seller)\)\s*',' ',row['name'],flags=re.I).strip()
  # Remove editorial caveats from factual fields; uncertainty remains in source metadata.
  for field in ['Clinical services','Main Products','Product categories','Medical director · source-reported']:
   value=p.get(field,'')
   if re.search(r'not publicly confirmed|available public snippet|accessible listing|profile excerpt|names not publicly listed',value,re.I):p[field]='Not provided'
   elif 'claimed on website' in value:p[field]=value.split(';')[0].replace(' featured','').strip()
  p['overview']=f"{row['name']} is listed in the supplied dataset. Organization details have not been independently reviewed by Source Standard."
  row['profile']=json.dumps(p,ensure_ascii=False)
  if row!=old:
   changes.append({'id':row['id'],'name':row['name']})
   sql.append(f"UPDATE directory SET name={quote(row['name'])}, profile={quote(row['profile'])} WHERE id={quote(row['id'])} AND status='Not verified by Source Standard';")
  kept.append(row)
 path.write_text(json.dumps(kept,ensure_ascii=False,indent=2)+'\n');counts[file]={'before':len(rows),'after':len(kept),'held':len(rows)-len(kept),'reasons':dict(reasons)}
(audit/'excluded-records.json').write_text(json.dumps(excluded,ensure_ascii=False,indent=2)+'\n')
(audit/'cleanup-summary.json').write_text(json.dumps({'counts':counts,'cleanedProfiles':len(changes),'policy':'Hold unsupported identities and directory listings; retain source originals and full excluded rows. No adverse findings about businesses.'},indent=2)+'\n')
Path('/private/tmp/source-standard-quality-cleanup.sql').write_text('\n'.join(sql)+'\n')
print(json.dumps({'counts':counts,'cleanedProfiles':len(changes)},indent=2))
