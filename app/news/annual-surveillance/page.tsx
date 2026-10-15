import AnnualUpdate from '../AnnualUpdate';import {ArrowLeft} from 'lucide-react';
export const metadata={title:'Annual surveillance for every participating vendor'};
export default function Article(){return <main id="main" className="editorial-page"><div className="wrap announcement-wrap"><a href="/news" className="editorial-back"><ArrowLeft size={16}/>All updates</a><AnnualUpdate/></div></main>}
