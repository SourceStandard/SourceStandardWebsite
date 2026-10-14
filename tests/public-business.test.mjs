import assert from 'node:assert/strict';
import {publicBusinessFields} from '../app/directory/public-business.ts';
const clean=publicBusinessFields({publicPhone:'+1 (813) 461-1130',publicEmail:'support@example.org',businessCountry:'United States',description:'Research materials.',logoUrl:'/business-logos/lux.webp',privateContact:'SECRET',supplier:'SECRET',sourceUrl:'SECRET',businessCity:{private:'SECRET'}});
assert.equal(clean.publicPhone,'+1 (813) 461-1130');assert.equal(clean.businessCountry,'United States');assert.equal(clean.logoUrl,'/business-logos/lux.webp');assert(!JSON.stringify(clean).includes('SECRET'));assert(!('businessCity' in clean));
for(const bad of ['javascript:alert(1)','https://example.org/logo.webp?secret=123','https://user:password@example.org/logo.png','/private/report.svg'])assert(!publicBusinessFields({logoUrl:bad}).logoUrl);
assert.equal(publicBusinessFields({logoUrl:'https://example.org/logo.webp'}).logoUrl,'https://example.org/logo.webp');
const invalid=publicBusinessFields({publicEmail:'hello@example.org?subject=hidden',publicPhone:'tel:javascript:bad'});assert(!invalid.publicPhone);assert(!invalid.publicEmail);
console.log('PASS: only explicit business-public string fields, valid contacts and safe image URLs are projected.');
