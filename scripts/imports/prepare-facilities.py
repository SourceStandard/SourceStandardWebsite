"""Prepare public facility CSV for local review; retains source row identities."""
import csv,json,sys
from pathlib import Path
from collections import Counter
from urllib.parse import urlparse
with Path(sys.argv[1]).open(encoding='utf-8-sig',newline='') as f:rows=list(csv.DictReader(f))
records=[];seen=set()
for r in rows:
 assert None not in r and r['name'].strip() and r['slug'].strip(),'Malformed facility row'
 identity='facility-'+r['slug'];assert identity not in seen,'Duplicate source slug';seen.add(identity)
 classification=r['type'];category='503A + 503B Brand' if classification=='503A + 503B Brand' else r['category']
 assert category in ('503A','503B','503A + 503B Brand'),'Unknown facility category'
 w=r['website'].strip();u=urlparse(w)
 assert not w or (u.scheme in ('http','https') and u.hostname and not u.username and not u.password),'Invalid website'
 location=r['location'].strip()
 if location in ('—','-','Unknown','Not stated'):location=''
 if not location:location=', '.join(x.strip() for x in (r['city'],r['state']) if x.strip())
 profile={'overview':r['name']+' is listed in the supplied facility dataset as '+classification+'. The classification, location, and service focus are source-reported; current licensure and registration have not been independently checked.','Facility classification':classification+' — reported in supplied dataset','Registration / license references':'Current registration and licensing have not been checked; supporting references were not supplied.','Compounding services':r['focus'] or 'Not provided','Facility locations':location or 'Not provided','sourceType':classification,'reportedCity':r['city'],'reportedState':r['state'],'rawSourceCategory':r['category']}
 if category=='503A + 503B Brand':profile['overview']+=' This is a brand-level record; it does not establish the classification or registration of any individual facility.'
 records.append({'id':identity,'name':r['name'].strip(),'kind':'facilities','website':w,'location':location,'category':category,'source':'User-supplied facility-records.csv; classification and services not independently rechecked','source_url':'','source_date':'Original research date not supplied','status':'Not verified by Source Standard','profile':json.dumps(profile,ensure_ascii=False)})
Path(sys.argv[2]).write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n')
cols=list(records[0]);q=lambda x:"'"+x.replace("'","''")+"'"
updates=','.join(c+'=excluded.'+c for c in cols if c!='id')
Path(sys.argv[3]).write_text('\n'.join('INSERT INTO directory ('+','.join(cols)+') VALUES ('+','.join(q(r[c]) for c in cols)+') ON CONFLICT(id) DO UPDATE SET '+updates+" WHERE directory.kind='facilities' AND directory.status='Not verified by Source Standard';" for r in records)+'\n')
print(json.dumps({'rows':len(records),'categories':dict(Counter(r['category'] for r in records))}))
