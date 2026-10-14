import {vendorMatches} from '../../../directory/search';
import {publicVendorStatus} from '../../../directory/public-status';
import {getDirectoryRecords} from '../../../directory/catalog';
export async function GET(request:Request){const q=(new URL(request.url).searchParams.get('q')||'').trim().toLowerCase().slice(0,160);if(q.length<2)return Response.json({records:[],total:0});try{const rows=(await getDirectoryRecords('vendors')).filter(r=>vendorMatches(r,q));return Response.json({total:rows.length,records:rows.slice(0,6).map(r=>{return {id:r.id,name:r.name,website:r.website,status:publicVendorStatus(r.status)}})},{headers:{'Cache-Control':'no-store'}})}catch{return Response.json({error:'Search is unavailable. Please open the vendor directory.'},{status:503})}}
