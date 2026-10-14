import assert from 'node:assert/strict';import {annualSchedule,anniversary,validDate} from '../app/annual-surveillance.ts';
const event=(date,id='test')=>({id,testDate:date,outcome:'Completed',product:'Synthetic test fixture',published:'yes'});
assert.equal(annualSchedule('2026-10-14',[],'2026-10-14').nextDueDate,'2027-10-14');
assert.equal(annualSchedule('2026-10-14',[],'2027-10-14').status,'Due today');
const overdue=annualSchedule('2026-10-14',[],'2027-10-15');assert.equal(overdue.status,'Overdue');assert.equal(overdue.nextDueDate,'2027-10-14');assert.equal(overdue.currentYear,2);
const boundary=annualSchedule('2026-10-14',[event('2027-10-14')],'2027-10-15');assert.equal(boundary.windows[0].events.length,1);assert.equal(boundary.windows[1].events.length,0);assert.equal(boundary.nextDueDate,'2028-10-14');assert.equal(boundary.windows[1].startDate,'2027-10-15');
const multiple=annualSchedule('2026-10-14',[event('2026-11-01'),event('2027-01-01','test2')],'2027-10-15');assert.equal(multiple.windows[0].events.length,2);assert.equal(multiple.windows[1].events.length,0);
assert.equal(anniversary('2024-02-29',1),'2025-02-28');assert.equal(anniversary('2024-02-29',4),'2028-02-29');
assert.equal(annualSchedule('2024-02-29',[event('2025-02-28')],'2025-03-01').windows[1].startDate,'2025-03-01');
for(const date of ['', '2026-02-30','2027-10-14']){const s=annualSchedule(date,[],'2026-10-14');assert.equal(s.nextDueDate,null);assert.equal(s.status,'Needs administrative resolution')}
assert.equal(validDate('2026-02-30'),false);assert.equal(validDate('2024-02-29'),true);
assert.equal(annualSchedule('2026-10-14',[],'2026-10-14','Reactivation requires review').nextDueDate,null);
assert.equal(annualSchedule('2026-10-14',[event('2026-10-15')],'2026-10-14').nextDueDate,null);
assert.equal(annualSchedule('2026-10-14',[event('2026-10-13')],'2026-10-14').windows[0].events.length,0);
for(const outcome of ['Failed','Inconclusive'])assert.equal(annualSchedule('2026-10-14',[{...event('2026-10-14'),outcome}],'2026-10-14').windows[0].events.length,1);
console.log('Annual schedules: initial deadline, recurring windows, boundaries, leap years, missing dates, reactivation holds, and actual events passed.');
