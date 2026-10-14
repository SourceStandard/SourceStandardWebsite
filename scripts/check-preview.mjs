const base='http://127.0.0.1:5173';
const results=[];
for(const path of ['/','/vendors','/manufacturers','/how-it-works','/standards','/registry','/apply','/about','/governance','/learn','/privacy','/terms','/contact']){const res=await fetch(base+path);const html=await res.text();if(res.status!==200||!html.includes('SOURCE'))throw Error('Page failed: '+path);results.push(path+': 200');}
let res=await fetch(base+'/api/applications');if(res.status!==401)throw Error('Anonymous GET should reject');
res=await fetch(base+'/api/applications',{method:'POST',headers:{'Content-Type':'application/json',Origin:base},body:'{}'});if(res.status!==401)throw Error('Anonymous POST should reject');
const signin=await fetch(base+'/signin-with-chatgpt?return_to=/account',{redirect:'manual'});const cookie=signin.headers.getSetCookie().map(v=>v.split(';')[0]).join('; ');if(!cookie)throw Error('Mock session missing');
res=await fetch(base+'/api/applications',{headers:{Cookie:cookie}});const data=await res.json();if(res.status!==200||data.applications.length!==1)throw Error('Saved intake missing');
res=await fetch(base+'/api/applications',{method:'POST',headers:{Cookie:cookie,'Content-Type':'application/json',Origin:'https://wrong.example'},body:'{}'});if(res.status!==403)throw Error('Cross-origin POST should reject');
res=await fetch(base+'/api/applications',{method:'POST',headers:{Cookie:cookie,'Content-Type':'application/json',Origin:base},body:'{}'});if(res.status!==400)throw Error('Invalid POST should reject');
const row=data.applications[0];const id=row.id.replace('SS-INTAKE-2026-','').toLowerCase();const payload={id,program:row.program,legalName:row.legalName,brandName:row.brandName,website:row.website,country:row.country,contactName:row.contactName,contactEmail:row.contactEmail,documentation:row.documentation,acknowledged:true};
res=await fetch(base+'/api/applications',{method:'POST',headers:{Cookie:cookie,'Content-Type':'application/json',Origin:base},body:JSON.stringify(payload)});if(res.status!==200)throw Error('Idempotent retry failed');
res=await fetch(base+'/api/applications',{headers:{Cookie:cookie}});const after=await res.json();if(after.applications.length!==1)throw Error('Duplicate intake saved');
console.log(results.join('\n'));console.log('PASS: anonymous access denied; persisted intake; cross-origin rejection; required-field validation; retry does not duplicate intake.');
