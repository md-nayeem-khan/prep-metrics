# CSV imports

The nine list pages provide **Import CSV → Download template → Validate file → Confirm import**. Validation never writes data. A conflict or invalid row blocks the entire file; identical records are skipped. New records and all relationships commit atomically.

## Format

Templates and inline field help come from `lib/import/definitions.ts`. Use UTF-8 comma-delimited CSV, with normal CSV quoting for commas, double quotes and multiline text. Limits: 2 MiB per file, 1,000 data rows, 128 KiB per record. Validation row numbers refer to spreadsheet records (header is row 1); CSV syntax errors may report physical line numbers.

Columns are case-insensitive but otherwise follow the template. Required columns and values cannot be omitted. Optional columns may be omitted; omitted columns are not compared against existing records. Blank cells mean the documented default, null, or an empty list. Identifiers stay strings, including leading zeros. Recognized enum casing is normalized (for example, legacy `Easy` becomes `easy`) and explicitly reported in preview notices; unknown values are rejected. Rich-text whitespace is preserved.

Relationship cells contain JSON arrays, such as `["Storage","Caching"]`; spreadsheet applications quote the whole CSV cell automatically. Names and question slugs must exactly match existing records owned by the signed-in user. Import companies, patterns, topics and competencies before records that reference them; import behavioral questions before linking stories to them. There is no fuzzy matching or implicit catalog creation.

Goal CSVs repeat goal fields for each milestone and group by the file-local `goalKey`. Use real `YYYY-MM-DD` dates, with milestones within the inclusive start/deadline range. Goal fields must match within each group. Identical repeated milestone rows are ignored with a warning; conflicting repeated milestones block the file. Goals start active, custom, at zero progress, with a percentage target of 100 and incomplete milestones.

Problems are matched by platform/problemId; question banks by slug; catalogs by name; stories by title; goals by title/startDate/deadline. Multiple existing matches block import. Story/goal identities are import rules, not new global uniqueness constraints. Goal milestone comparisons ignore completion state.

## API

Entities: `goals`, `problems`, `patterns`, `companies`, `system-design`, `topics`, `behavioral`, `stories`, `competencies`.

- `GET /api/import/{entity}/template`: downloadable CSV example.
- `POST /api/import/{entity}/preview`: multipart `file`. Returns `rows`, `totals`, `issues`, `warnings`, and a `token` only when valid.
- `POST /api/import/{entity}/commit`: multipart `file`, `token`, and UUID v4 `requestId`. Returns `created`, `skipped`, and newly created `recordIds`.

Confirmation expires after 15 minutes and is bound to the authenticated user, entity, exact bytes, schema version, normalized defaults, resolved references, and preview decisions. Commit revalidates within a serializable transaction. Stale previews require validation again. A committed request can be recovered using the original file, token, and UUID even after token expiration. Reusing a UUID with different input is rejected. Do not generate a new UUID when retrying an uncertain network result.

Status codes: 400 malformed input/confirmation; 401 unauthenticated; 404 unknown entity; 409 stale preview/conflict; 413 size/row limit; 422 row validation; 503 overall transaction budget exhausted; 500 unexpected failure. Issues contain `row`, `column`, `code`, and `message`.

The legacy `POST /api/export/csv` now aliases **preview**. To commit through that alias, use `?action=commit` with the same confirmation fields. Its former immediate-write behavior and response shape are intentionally retired. Existing problem-export column names remain supported, including semicolon-separated tags/patterns. Attempts, last status/time and created date columns are explicitly ignored; activity history is never reconstructed. Problem CSV export uses proper quoting and JSON arrays for lossless tags/patterns.

## Database rollout

Generate the Prisma client and deploy `20260926000000_csv_import_receipts` to the intended PostgreSQL database before enabling imports. No existing records are rewritten. The receipt is stored with the new records in the same transaction. `AUTH_SECRET` must contain at least 32 characters, as required by existing authentication.

The repository's older migration chain cannot currently bootstrap an empty database: the timezone migration alters `users`, but its creation/tenant migration is missing from the checked-in history. Do not reset an existing database to address this. Reconcile its migration history through the project's deployment process. The import tests instead bootstrap the current baseline in a randomly named isolated schema, drop the empty receipt table, and apply the new receipt migration explicitly.

Production data is never used by the integration/browser test helpers. Set `TEST_DATABASE_URL` explicitly to a disposable PostgreSQL database. Each run creates and cleans up its own `csv_test_*` schema.

## Verification commands

```text
npm test
npx tsc --noEmit --incremental false
npm run lint
npm run build
npm run test:import:db
npx playwright install chromium
npm run test:import:e2e
```

Database and browser tests require `TEST_DATABASE_URL`; browser tests also require the production build. Coverage includes all nine templates, malformed inputs, ownership, atomic rollback, concurrent overlapping imports, receipt replay, stale relationships, expired tokens, and a 1,000-record batch. Browser tests use port 3107 and an isolated database; the application dev server can remain on port 3000.

The 50-second commit budget includes bounded serialization retries. The 1,000-row limit is an upper bound, not a guarantee on high-latency databases; an exhausted transaction rolls back and can be retried. Validate again after changing any uploaded file. Existing filters remain active after import, so a filtered list may not show every newly created record.


### Validation hardening (schema version 2)

Text identifiers, names, categories, and each relationship/tag list item are limited to 800 UTF-8 bytes. Rich text retains the existing record-size limit. These bounds come from the shared field registry and are shown in the import dialog. GeeksforGeeks is accepted alongside every existing problem-form platform.

Preview returns `issueCount` and `warningCount` including diagnostics omitted from the response. Each collection includes at most 200 details, with bounded column/message text; the dialog paginates 20 details at a time. Fix the reported errors and revalidate to discover remaining errors. Skipped blank CSV lines count in logical row numbers; newlines inside quoted cells do not create extra rows.

Related names are compared after trimming both CSV and owned catalog values, case-sensitively. Whitespace variants that produce multiple matches are ambiguous. Receipt UUIDs are normalized to lowercase. Blank optional string values compare equally with stored empty strings/null values.
