# Source Standard publishing

The user requires the matching website source to be pushed to https://github.com/SourceStandard/SourceStandardWebsite whenever a release is published to sourcestandard.org.

- Keep local-preview changes local until the user approves publication.
- Preserve the native Sites project and supported Sites publishing workflow; GitHub is a source mirror, not a hosting migration.
- After a successful production deployment, mirror the exact deployed source to the private GitHub repository and update `.source-standard-release.json` with the Sites version and source commit.
- Never upload runtime secrets, `.dev.vars`, `.env` files, local databases, applications, private sourcing records, private research files, build output or dependency directories. Audit the export first. Use a sanitized current source snapshot; do not upload historic Git objects containing private data.
- Preserve existing GitHub history. Use normal commits and expected-head checks; never force-push over unrelated work. If the repository has diverged, inspect and reconcile before pushing.
- Confirm GitHub's resulting commit and report a failed mirror separately from a successful website deployment. Do not claim GitHub is synced without verification.
- Lux Research Supply's membership stays Verified unless the owner explicitly changes it. Keep all admin APIs authenticated.
