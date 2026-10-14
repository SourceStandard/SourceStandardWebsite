# Source Standard native Sites rebuild

Private peptide-framework rebuild based on the October 2026 Master Plan, Verification Framework, Revenue Model, Growth Strategy, and Communications Guide.

## Ownership and source

The original Lovable repository is retained separately at `../source-standard-site` as a migration reference. This checkout is the native Sites source. The Site identity is tracked in `.openai/hosting.json`; reuse it for every update. Never create a replacement Site for routine changes.

## Implemented

- Institutional navy-and-white design using the Source Standard shield logo, responsive navigation, and complete Explore, Participate, and Organization hubs.
- Six searchable knowledge guides, a searchable FAQ, full framework/program pages, contact and concern email composers.
- Clearly fictional registry examples with individual scope records, connected program links, copy and print actions.
- Three-step application flow with readiness, editable review, saved receipt, and account details.
- Database-backed public recognition registry, searchable by name or ID and filtered by program.
- Separate preliminary vendor and manufacturer intake, saved in D1 with account-scoped retrieval.
- ChatGPT sign-in and My applications.
- Server-side validation, same-origin submission checks, retry idempotency, and per-account daily submission limits.
- Legacy clinic/facility URL families lead to the corresponding registry rather than importing old clinical records as peptide recognition.

The hosted registry begins empty. Application receipt is not recognition. Private access remains in place. The existing domain has not been changed.

## Boundaries before public launch

Automated intake email, payments, confidential document uploads, operator review UI, status history workflows, and laboratory integrations are not enabled. These are separate implementation steps. Public recognition records require evidence-backed decisions. Legal terms and retention policy must be finalized for public operation.

The registry has no automatic application-to-recognition promotion. Operators can inspect intake through native Sites database tools. A protected operator workflow should be implemented before opening intake at scale.

## Development and checks

Follow the Sites skill for dependency installation, database migration, local preview, builds, source synchronization, and deployment. The generated `drizzle/` migration is schema-only. Local preview state and fixture records are ignored and are never packaged.

`node node_modules/typescript/bin/tsc --noEmit --incremental false` checks types. `scripts/check-preview.mjs` verifies the local preview using its mock sign-in and an existing local QA intake. Local mock identity does not ship to production.

## Verification completed

The presentation crawler verified 33 destinations, 33 internal linked destinations, 91 section anchors, brand assets, legacy redirects, and missing-record 404 behavior. Browser QA verified desktop and 390px mobile layouts, mobile navigation, saved application receipt and account display, program/ID filtering, no-result handling, and filter reset. API checks verified unauthenticated rejection, required-field validation, cross-origin rejection, idempotent retries, and isolation from another user's seeded local intake.

Contact and concern forms prepare email text; they do not send it or claim a submission. Example records are frontend references, never production database fixtures. Browser checks also covered FAQ filtering, full registry records, record-prefilled concern composition, and the manufacturer application review/save/account journey.

Navigation uses standard browser links to avoid a production-only Vinext client-routing error and keep presentation page transitions reliable.

## Independent organization directories

Four separate routes: `/directory/vendors`, `/directory/manufacturers`, `/directory/clinics`, and `/directory/facilities`. Each has search, category/standing filters, pagination, empty states, and category-specific profiles at `/directory/<kind>/<id>`. `/example` displays an explicitly fictional profile format; examples are never database rows.

The `directory` table is separate from recognition and application tables. Identity, classification, provenance, standing, and profile detail are prepared for spreadsheet imports. No company data is seeded automatically. New listings default to `Not verified by Source Standard`. No supplier relationship fields or connections are displayed. Historical source files remain untouched; imports await the user's spreadsheets.
