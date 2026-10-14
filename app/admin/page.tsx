import {env} from 'cloudflare:workers';
import AdminDashboard from './AdminDashboard';
export const metadata={title:'Admin',robots:{index:false,follow:false}};
export default function Admin(){return <main id="main" className="wrap section"><AdminDashboard preview={(env as unknown as Record<string,string>).LOCAL_PREVIEW==='true'}/></main>}
