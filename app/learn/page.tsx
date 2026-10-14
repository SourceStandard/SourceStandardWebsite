import PageHeading from '../components/PageHeading';
import KnowledgeLibrary from './KnowledgeLibrary';
export const metadata={title:'Knowledge Center'};
export default function Learn(){return <main id="main"><PageHeading eyebrow="KNOWLEDGE CENTER" title="Understand testing. Check the claims." intro="Clear guides to lab reports, sample evidence, and Source Standard surveillance. Start with a topic or search for your question."/><div className="wrap section"><KnowledgeLibrary/><div className="note">These guides explain Source Standard’s surveillance program. They are not medical advice or recommendations for human use.</div></div></main>}
