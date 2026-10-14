import approved from '../data/approved-memberships.json';import {getDb} from '../db';import {memberships} from '../db/schema';
// Database decisions take precedence, so later suspensions/removals cannot be undone by a release.
export async function membershipRecords(db=getDb()){const rows=await db.select().from(memberships);const byId=new Map(rows.map(r=>[r.companyId,r]));for(const r of approved)if(!byId.has(r.companyId))byId.set(r.companyId,r);return [...byId.values()]}
