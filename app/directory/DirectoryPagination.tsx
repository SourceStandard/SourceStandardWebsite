'use client';

import {ChevronLeft,ChevronRight} from 'lucide-react';

type Props={
  page:number;
  pages:number;
  onChange:(page:number)=>void;
  position?:'top'|'bottom';
  disabled?:boolean;
};

export default function DirectoryPagination({page,pages,onChange,position='bottom',disabled=false}:Props){
  if(pages<=1)return null;

  return <nav className={`directory-pagination pagination-${position}`} aria-label={`${position==='top'?'Top':'Bottom'} pagination`}>
    <button className="button secondary" type="button" aria-label="Previous page" disabled={disabled||page===1} onClick={()=>onChange(page-1)}>
      <ChevronLeft size={18} aria-hidden="true"/><span>Previous</span>
    </button>
    <div className="page-choice">
      <select aria-label={`Results page (${position})`} value={page} disabled={disabled} onChange={e=>onChange(Number(e.target.value))}>
        {Array.from({length:pages},(_,i)=><option key={i+1} value={i+1}>Page {i+1} of {pages}</option>)}
      </select>
    </div>
    <button className="button secondary" type="button" aria-label="Next page" disabled={disabled||page===pages} onClick={()=>onChange(page+1)}>
      <span>Next</span><ChevronRight size={18} aria-hidden="true"/>
    </button>
  </nav>;
}
