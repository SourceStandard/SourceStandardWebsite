import {cache} from 'react';
import {publicBusinessFields} from './public-business';
import business from '../../data/reviewed-public-business.json';
import {eq} from 'drizzle-orm';
import {getDb} from '../../db';
import {directory} from '../../db/schema';
import additions from '../../data/public-vendor-additions.json';
import companies from '../../data/unverified-public-companies.json';
import clinics from '../../data/unverified-clinics.json';
import facilities from '../../data/unverified-facilities.json';
import {programSummaries} from '../program';
import {type DirectoryRecord,type Kind} from './config';
// The reviewed public catalog ships with its release; local database state is not deployed.
const catalog:DirectoryRecord[]=[...companies,...additions,...clinics,...facilities].map(r=>({...r,sourceUrl:r.source_url,sourceDate:r.source_date}));
export async function getRawDirectoryRecords(kind:Kind){const rows=new Map(catalog.filter(r=>r.kind===kind).map(r=>[r.id,r]));try{const reviewed=await getDb().select().from(directory).where(eq(directory.kind,kind));for(const r of reviewed)rows.set(r.id,r)}catch{}return [...rows.values()].sort((a,b)=>a.name.localeCompare(b.name))}

function socialUrl(value:unknown){if(typeof value!=='string')return '';try{const url=new URL(value);if(url.protocol!=='https:'||!['instagram.com','www.instagram.com'].includes(url.hostname)||!/^\/[A-Za-z0-9_.]+\/?$/.test(url.pathname))return '';return 'https://www.instagram.com'+url.pathname}catch{return ''}}
// Explicit public projection: no discovery ratings, private sourcing, or migration metadata.
export const getDirectoryRecords=cache(async(kind:Kind)=>{if(kind==='manufacturers')return [];const rows=await getRawDirectoryRecords(kind);const memberRows=kind==='vendors'?await programSummaries():new Map();return rows.map(row=>{let p:Record<string,string>={};try{const parsed=JSON.parse(row.profile);if(parsed&&typeof parsed==='object'&&!Array.isArray(parsed))p=parsed}catch{}const membership=memberRows.get(row.id);const instagramUrl=socialUrl(p.instagramUrl);const category=kind==='vendors'?/instagram seller|^reseller$/i.test(row.category)?'Vendor · classification unconfirmed':/research peptide retailer/i.test(row.category)?'Research peptide vendor · reported':row.category:row.category;const reviewed=(business as Record<string,Record<string,string>>)[row.id]||{};const profile=kind==='vendors'?{...publicBusinessFields({...reviewed,...p}),membership:membership?.status||'Enrollment not recorded',activationDate:membership?.activationDate||'',testing:membership?.testing||'Not Yet Tested',...(instagramUrl?{instagramUrl}:{}),...(typeof p.alternateName==='string'&&p.alternateName.length<=160?{alternateName:p.alternateName}:{}),...(typeof p['Research-use designation']==='string'&&p['Research-use designation'].includes('company website')?{'Research-use designation':p['Research-use designation']}:{})}:Object.fromEntries(['Clinical services','Care format','Medical director · source-reported','Facility classification','Compounding services'].filter(k=>typeof p[k]==='string').map(k=>[k,p[k]]));return {id:row.id,name:row.name,kind:row.kind,website:row.website,location:row.location,category,source:'Public organization information',sourceUrl:row.website||instagramUrl,sourceDate:row.sourceDate,status:kind==='vendors'?membership?.status||'Enrollment not recorded':kind==='facilities'?'Unverified':'Directory listing',profile:JSON.stringify(profile)}})});
