import type {Metadata} from 'next';
import './globals.css';
import './mobile.css';
import Header from './components/Header';
import Footer from './components/Footer';
export const dynamic='force-dynamic';
export const metadata:Metadata={metadataBase:new URL('https://sourcestandard.org'),title:{default:'Source Standard | Independent Testing & Transparency',template:'%s | Source Standard'},description:'Find research vendors, check Source Standard verification, and explore published identity and purity test results. Browse separate clinic and compounding directories.',robots:{index:true,follow:true},icons:{icon:'/favicon.svg'}};
export default async function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><a className="skip" href="#main">Skip to content</a><Header/>{children}<Footer/></body></html>}
