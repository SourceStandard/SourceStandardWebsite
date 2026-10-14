'use client';
import {scopeStatement,excludedStatement} from '../program-copy';
export default function ProgramScope(){return <aside className="program-scope"><strong>Know the scope</strong><p>{scopeStatement}</p><p>{excludedStatement}</p><a className="text-link" href="/standards">Read the methodology →</a></aside>}
