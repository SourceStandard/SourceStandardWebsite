# Admin intake

Admin sign-in is at `/admin`; company requests enter through `/apply`.

The local D1 database stores requests, private notes, short-lived hashed sessions, and rate-limit counters. Admin APIs enforce authentication on every request. Workflow changes never set public directory verification.

Local credentials are read from an ignored `.dev.vars` file. Required server settings: `ADMIN_EMAIL` and `ADMIN_PASSWORD_HASH`. The hash format is `salt:hex`, using PBKDF2-SHA256, 100,000 iterations, a random 24-byte salt encoded as hex, and a 32-byte output. The password is never stored in source.

After building, copy the ignored `.dev.vars` into `dist/server/.dev.vars` before starting the local preview. Apply pending schema migrations to the local database once.

For publication, configure these settings as hosted runtime secrets, apply the included migration through the Sites publishing workflow, and test production sign-in, intake, and logout. Local preview submissions do not transfer to production. Customer email sign-in and notifications are still disconnected.
