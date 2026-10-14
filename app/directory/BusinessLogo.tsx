'use client';
import {useState} from 'react';
export default function BusinessLogo({src,initials}:{src?:string;initials:string}){const [failed,setFailed]=useState(false);return <div className="business-logo" aria-hidden="true">{src&&!failed?<img src={src} alt="" onError={()=>setFailed(true)}/>:<span>{initials}</span>}</div>}
