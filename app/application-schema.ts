import { z } from "zod";
const short=z.string().trim().min(2).max(160);
export const applicationSchema=z.object({
 id:z.string().uuid(),program:z.enum(['vendor','manufacturer']),legalName:short,brandName:short,
 website:z.string().trim().url().max(250).refine(v=>/^https?:\/\//i.test(v),'Use an http or https website.'),
 country:short,contactName:short,contactEmail:z.string().trim().email().max(250),
 documentation:z.enum(['ready','preparing','not-yet']),acknowledged:z.literal(true),
});
