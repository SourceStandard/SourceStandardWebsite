import {researchVendorLabel} from './public-labels';
export const kinds = {
 vendors:{title:'Research vendors',label:'Research vendors',description:'Find companies, check verification status, and explore published test results.',category:researchVendorLabel,fields:['Research-use designation','Product categories','Operating region','Public contact']},
 manufacturers:{title:'Manufacturer directory',label:'Manufacturers',description:'Find companies making peptides or providing custom synthesis and manufacturing services. Business details are source-reported.',category:'Peptide manufacturer',fields:['Manufacturing services','Facility locations','Country of operation','Public contact']},
 clinics:{title:'Clinic directory',label:'Clinics',description:'Clinical providers offering in-person, hybrid, or telehealth care. Services are source-reported; directory inclusion is not verification.',category:'Clinic / clinical provider',fields:['Clinical services','Care format','Medical director · source-reported','Facility locations']},
 facilities:{title:'503A / 503B facility directory',label:'503A / 503B facilities',description:'Compounding pharmacies and outsourcing facilities, listed separately from vendors supplying materials for research use.',category:'Compounding pharmacy / facility',fields:['Facility classification','Registration / license references','Compounding services','Facility locations','Public contact']}
} as const;
export type Kind=keyof typeof kinds;
export function isKind(s:string):s is Kind{return Object.hasOwn(kinds,s)}
export type DirectoryRecord={id:string;name:string;kind:string;website:string;location:string;category:string;source:string;sourceUrl:string;sourceDate:string;status:string;profile:string};
export function example(kind:Kind):DirectoryRecord{return {id:'example',name:`Example ${kind==='clinics'?'Clinic':kind==='facilities'?'Compounding Facility':kind==='vendors'?researchVendorLabel:'Manufacturer'}`,kind,website:'https://example.com',location:'Example city / country · fictional',category:kinds[kind].category,source:'Illustrative profile format',sourceUrl:'',sourceDate:'No real source record',status:'Not verified by Source Standard',profile:JSON.stringify({overview:'This fictional profile demonstrates how organization identity, source information, and verification standing will be presented. It is not a real organization.',...Object.fromEntries(kinds[kind].fields.map(f=>[f,f==='Facility classification'?'Illustrative: 503B classification reported; registration not assessed':f==='Country of operation'?'Illustrative country; not an actual manufacturer location':f==='Product categories'?'Illustrative research peptide category':f==='Public contact'?'Not provided':'Illustrative source information; not independently verified']))})}}

export function isVerified(r:DirectoryRecord){let p:Record<string,string>={};try{const data=JSON.parse(r.profile);if(!data||typeof data!=='object'||Array.isArray(data))return false;p=data}catch{return false}return ["Verified","Verified by Source Standard","Vendor Verified"].includes(r.status)&&typeof p.reviewDate==='string'&&!Number.isNaN(Date.parse(p.reviewDate))&&Date.parse(p.reviewDate)<=Date.now()&&typeof p.scope==='string'&&!!p.scope.trim()&&(!p.validUntil||(typeof p.validUntil==='string'&&!Number.isNaN(Date.parse(p.validUntil))&&Date.parse(p.validUntil+'T23:59:59Z')>=Date.now()))}

// Presentation labels are independent of the retained source classifications.
export function publicName(r:DirectoryRecord){return r.name.replace(/\s*\((?:Instagram seller|marketplace seller)\)\s*/gi,' ').trim()}
export function publicType(r:DirectoryRecord){
 if(r.kind==='manufacturers')return 'Peptide manufacturer';
 if(r.kind==='clinics')return 'Clinical provider';
 if(r.kind==='facilities')return r.category==='503A'?'503A compounding pharmacy':r.category==='503B'?'503B outsourcing facility':'Compounding organization';
 if(/classification unconfirmed/i.test(r.category))return 'Business type not confirmed';
 if(/research peptide vendor.*reported/i.test(r.category))return 'Research vendor · source-reported';
 if(/affiliate|informational/i.test(r.category))return 'Industry information provider';
 if(/marketplace/i.test(r.category))return 'Research business';
 return researchVendorLabel;
}
export function publicLocation(r:DirectoryRecord){const value=r.location.trim();if(!value||/^(unknown\b|not (?:provided|stated|available|publicly listed)|n\/?a$|[-—]$)/i.test(value))return '';return value.replace(/\s*\([^)]*\)/g,'').trim()}
