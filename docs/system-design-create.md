# System Design creation

Questions and Topics have manual create actions alongside CSV import. The question sheet supports optional reference material, explicit topic/company selection and inline topic creation. Creating an inline topic saves it immediately; discarding the question does not delete that topic.

Required question fields: title, prompt, difficulty, category and slug (generated from title, editable). Required topic fields: name and category. Categories permit custom text. The shared validation registry supplies enums and defaults used by CSV imports. Rich text retains whitespace.

`POST /api/system-design` and `POST /api/system-design/topics` require the session cookie and JSON. Responses are `{ question }` / `{ topic }` with status 201. Validation returns `{ error, fields }` (400); duplicate slug/name returns 409 and, when available, `existingId`. Other responses include 401, 413 (256 KiB request limit), 415 and a sanitized 500.

Names and slugs are unique per user using existing case-sensitive database constraints. Duplicate question retries use the same slug and never silently create a new identifier. A lost response can therefore produce a duplicate conflict with a link to the saved question. This is not a generic idempotency receipt API.

Creation scopes all parent and relationship queries to the authenticated user, assigns ownership to join rows, and uses a serializable transaction with up to three attempts. This feature needs no new schema migration. Existing CSV receipt rollout requirements are separate.

Verification commands:

- `npm test`
- `npx tsc --noEmit`
- `npm run test:create:db`
- `npm run test:create:e2e` (requires a production build)

Database/browser tests require `TEST_DATABASE_URL` pointing to disposable PostgreSQL. The runner creates and removes a random schema and never falls back to the application's `DATABASE_URL`.


### Draft navigation and validation focus

Question drafts (including manually edited slugs, selections, and inline topic drafts) and standalone topic drafts are retained in tab memory across client-side Back/Forward navigation. Reopen the create dialog to resume. Draft lookup is scoped to the account verified by `/api/auth/me`; draft content is not written to localStorage. Explicit discard or a successful save clears the corresponding draft. Existing document-unload warnings still protect reload/tab close; choosing to leave the document discards this memory-only draft.

Failed submissions request focus after React renders errors, expands optional sections, and re-enables controls. Blur validation does not steal focus. Pending focus work is cancelled on unmount.
