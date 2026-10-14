"""Prepare user-supplied public CSV for directory review. Never deploys or imports remotely."""
import csv, hashlib, json, sys, unicodedata, re
from pathlib import Path
from urllib.parse import urlparse
from collections import Counter
source=Path(sys.argv[1]); output=Path(sys.argv[2]); sql_path=Path(sys.argv[3])
with source.open(encoding='utf-8-sig',newline='') as f: rows=list(csv.DictReader(f))
required=['Company','Website','Instagram','Instagram URL','Type','Country / Region','Main Products','Instagram Status']
assert rows and all(k in rows[0] for k in required),'Missing columns'
assert all(None not in r and all(r.get(k) is not None for k in required) for r in rows),'Malformed CSV'
records=[];seen=set()
def url(s):
 s=s.strip();p=urlparse(s)
 if s and (p.scheme not in ('http','https') or not p.hostname or p.username or p.password):raise ValueError('Invalid public URL')
 return s
for r in rows:
 name=r['Company'].strip();assert name,'Missing name'
 key=unicodedata.normalize('NFKC',name).casefold();assert key not in seen,'Duplicate name';seen.add(key)
 kind='manufacturers' if r['Type']=='Manufacturer / CDMO' else 'vendors'
 slug=re.sub(r'[^a-z0-9]+','-',unicodedata.normalize('NFKD',name).encode('ascii','ignore').decode().lower()).strip('-')[:65]
 identity=('manufacturer-' if kind=='manufacturers' else 'vendor-')+slug+'-'+hashlib.sha256(key.encode()).hexdigest()[:8]
 region=r['Country / Region'].strip();location='' if region in ('Not stated','Unknown','') else region
 profile={'overview':name+' is listed in the supplied public company dataset as '+r['Type'].lower()+'. Company details and product descriptions are source-reported and have not been independently assessed by Source Standard.','sourceType':r['Type'],'Main Products':r['Main Products'],'countryReported':region,'instagramHandle':r['Instagram'],'instagramUrl':url(r['Instagram URL']),'instagramStatus':r['Instagram Status'],'Product categories':r['Main Products'] or 'Not provided','Operating region':location or 'Not provided','Country of operation':location or 'Not provided','Research-use designation':'Research peptide retailer, as classified in the supplied dataset' if r['Type']=='Research peptide retailer' else 'Not established by the supplied dataset'}
 if r['Type']=='Affiliate / informational':profile['overview']+=' This source classifies the entry as affiliate/informational; this listing does not establish that it sells products directly.'
 records.append({'id':identity,'name':name,'kind':kind,'website':url(r['Website']),'location':location,'category':r['Type'],'source':'User-supplied public company dataset; details not independently rechecked','source_url':'','source_date':'Original research date not supplied','status':'Not verified by Source Standard','profile':json.dumps(profile,ensure_ascii=False)})
assert len({r['id'] for r in records})==len(records)
output.parent.mkdir(parents=True,exist_ok=True);output.write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n')
cols=list(records[0]);quote=lambda x:"'"+x.replace("'","''")+"'"
sql_path.write_text('\n'.join('INSERT INTO directory ('+','.join(cols)+') VALUES ('+','.join(quote(r[c]) for c in cols)+') ON CONFLICT(id) DO NOTHING;' for r in records)+'\n')
print(json.dumps({'source_rows':len(rows),'directories':dict(Counter(r['kind'] for r in records)),'categories':dict(Counter(r['category'] for r in records)),'instagram_source_status':dict(Counter(r['Instagram Status'] for r in rows))}))
