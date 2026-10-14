import PageHeading from '../components/PageHeading';
import EmailAccount from './EmailAccount';
export const metadata={title:'Your Account'};
export default async function Account({searchParams}:{searchParams:Promise<{email?:string}>}){const {email}=await searchParams;return <main id="main"><PageHeading eyebrow="YOUR ACCOUNT" title="Stay connected to your request" intro="Create an account or sign in with your email. No password or ChatGPT account needed."/><div className="wrap section email-account-layout"><EmailAccount initialEmail={email?.slice(0,250)||''}/></div></main>}
