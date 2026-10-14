import { getChatGPTUser } from "../../chatgpt-auth";
import { getDb } from "../../../db";
import { applications } from "../../../db/schema";
import { and, eq, gte, desc, count } from "drizzle-orm";
import { applicationSchema } from "../../application-schema";
export const dynamic='force-dynamic';
const reply=(body:unknown,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store'}});
export async function GET(){const user=await getChatGPTUser();if(!user)return reply({error:'Sign in to view your applications.'},401);try{const rows=await getDb().select().from(applications).where(eq(applications.userId,user.userId)).orderBy(desc(applications.createdAt));return reply({applications:rows});}catch{return reply({error:'Applications are temporarily unavailable.'},503);}}
export async function POST(){return reply({error:'Legacy intake is closed. Use the company introduction at /apply. Manufacturer enrollment is not a launch service.'},410);}
