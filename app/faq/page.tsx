import PageHeading from '../components/PageHeading';
import Faq from './Faq';
export const metadata={title:'Frequently Asked Questions'};
export default function Page(){return <main id="main"><PageHeading eyebrow="FREQUENTLY ASKED QUESTIONS" title="Frequently asked questions" intro="Clear answers about listings, membership, independent sampling, and what findings can—and cannot—show."/><div className="wrap section"><Faq/></div></main>}
