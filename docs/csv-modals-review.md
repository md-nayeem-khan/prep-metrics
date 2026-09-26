# CSV import and creation modal acceptance review

Reviewed 2026-09-26. Scope: the uncommitted CSV importer, all nine list integrations, problem export, and System Design question/topic creation dialogs and APIs. Application source was not changed during this review. All database and browser writes used a disposable PostgreSQL container and random isolated schemas; the application database was not used.

**Historical review decision (before the fixes below): do not sign off all acceptance criteria yet.** The transactional creation and ownership checks passed the exercised cases. The additional probes below found acceptance failures that the existing tests missed.

## Findings requiring correction

### R1 — P1: Goal date-only values shift in display and edit forms

Locations: `lib/server/csv-import.ts:69`, `app/goals/page.tsx:89`, `app/goals/page.tsx:98`.

Import the goal template in an `America/Los_Angeles` browser. Stored dates are correctly `2026-10-01`, `2026-10-31`, and `2026-10-15` at UTC midnight. The card displays **Sep 30–Oct 30**; the edit inputs contain **2026-09-30, 2026-10-30, 2026-10-14**. Submitting that form sends the shifted dates back. This is an existing goal-rendering problem exposed by imports, and directly fails the required display round-trip acceptance criterion. The existing integration test checks `toISOString()`, not display/edit round-trips.

Correction: consistently treat these values as calendar dates in rendering and form conversion. Keep storage, display, editing and comparisons aligned. Add browser round-trips in UTC, a negative offset and a positive offset, including saving an otherwise unchanged form.

### R2 — P2: Relationship resolution does not use trimmed existing names

Location: `lib/server/csv-import.ts:119`.

The database query filters names with `in: wanted` before the returned values are trimmed. With only an owned topic named `" Cache "`, a CSV reference to `"Cache"` produces `MISSING_REFERENCE`. With both `"Cache"` and `" Cache "`, preview incorrectly issues a confirmation token instead of reporting an ambiguous reference. Both cases were reproduced against PostgreSQL.

Correction: resolve against the same trimmed representation used for comparison, and detect all matches before selecting an ID. Preserve exact case-sensitive matching and explicit user scope.

### R3 — P2: Question drafts are lost through client-side browser Back

Location: `components/forms/create-question-sheet.tsx:80`; analogous protection in `components/forms/create-topic-dialog.tsx:25`.

Navigate from Topics to Questions using the sidebar, open Add question, enter a title, then press browser Back. The browser returns to Topics; the draft disappears with **zero discard dialogs and zero beforeunload dialogs**. This was reproduced in Chromium. The current protection covers sheet dismissal and document unload, but not Next.js history navigation.

Correction: protect client-side navigation or retain/restorably persist drafts outside the page component. Test Back/Forward as well as Cancel, Escape, reload and tab close. Topic navigation protection shares the same mechanism, but the dedicated Back reproduction was performed on the question sheet.

### R4 — P2: Relationship errors and the error table are not capped

Locations: `lib/server/csv-import.ts:135`, `components/import/csv-import-dialog.tsx:92`.

A valid-size **733,826-byte** CSV with 1,000 question rows and 50 missing topic names per row produces **50,000 issues** and a **6,834,453-byte** preview response. The dialog maps every issue to a table row; the scroll container limits height, not DOM size. This fails the bounded-errors requirement and creates avoidable response/rendering load. The response size and issue count were measured; browser rendering time for all 50,000 rows was not measured.

Correction: cap/aggregate diagnostics, return total/truncated counts, and paginate or virtualize visible errors. Keep enough row/column context to correct the file. Add a worst-case error-volume acceptance test.

### R5 — P2: Preview accepts identity values PostgreSQL cannot index

Locations: `lib/import/definitions.ts:7`, `lib/import/csv.ts:21`.

A CSV containing one random 6,000-character company name is only **6,008 bytes**. Preview reports no issues and issues a token. Commit fails with PostgreSQL `54000`: index row size 6024 exceeds the B-tree limit of 2704. The route turns this into a generic unexpected failure rather than a row/column validation error. This was reproduced against PostgreSQL. Transaction rollback remains intact.

Correction: define and document appropriate limits for indexed names/identifiers, accounting for UTF-8 bytes and compound index overhead, or use an index strategy that supports the promised values. Enforce limits in preview and template field help. Test Unicode boundaries and database acceptance, not only parser record sizes.

### R6 — P2: Invalid-field focus is intermittent

Locations: `components/forms/system-design-fields.tsx:59`, `components/forms/create-question-sheet.tsx:91`.

The full browser run failed `a lost response can be recovered without creating a duplicate`: the slug became invalid and visible, but did not receive focus within 30 seconds. Five focused reruns passed. This is an intermittent failure, not a deterministic failure on every submission. The one-shot `requestAnimationFrame` lookup is not synchronized with the optional section mounting and controls becoming enabled, which is consistent with the observed result; the exact scheduling interleaving was not instrumented.

Correction: apply pending error focus after the relevant DOM has committed and the control is enabled. Add coverage for errors inside initially collapsed sections under delayed rendering/network responses. Retrying the test alone is not an acceptance fix.

### R7 — P2: Existing GeeksforGeeks problems cannot round-trip through CSV

Locations: `lib/import/definitions.ts:43`, `components/forms/AddProblemForm.tsx:39`.

The existing problem form offers `GeeksforGeeks`, and the export writes the stored platform verbatim. The new importer only accepts leetcode/codeforces/atcoder/hackerrank/other. An otherwise valid legacy-format row with `Platform=GeeksforGeeks` and `Difficulty=Easy` is rejected on platform. This was reproduced with the parser. It violates the existing-export reimport criterion; the compatibility fixtures exercise LeetCode only.

Correction: establish a shared supported-platform contract that includes existing supported UI values, normalize their casing explicitly, and test exported records from every supported platform.

## Additional confirmed edge cases

- **CSV row labels after blank lines:** `lib/import/csv.ts:67` skips blank lines, then line 99 uses `index + 2`. `name\n\n\nAcme` reports row 2 although the spreadsheet record is on row 4. Track logical spreadsheet rows including empty records while keeping multiline cells as one record.
- **Receipt UUID casing:** `lib/server/csv-import.ts:166` accepts both cases, but stores/looks up the original text. Replaying the same committed request with the UUID uppercased returns `STALE_PREVIEW` instead of the original receipt. Normalize UUIDs before lookup/storage. No duplicate record was created in this probe.
- **CSV dialog reopening:** closing and reopening after preview leaves the native file input with zero selected files while Confirm import remains enabled for the retained file. Preserve the filename visibly if retaining the preview/file for retry, or reset both coherently. Reproduced in Chromium.
- **Empty-string/null comparison:** `lib/server/csv-import.ts:41` keeps existing `url: ''`, while parsing an exported blank URL yields `null`. An otherwise identical problem export reports a URL conflict. Reproduced with the real analysis function and a test database delegate; this particular edge case was not repeated against PostgreSQL. The existing problem update API permits an empty string. Normalize existing optional empty values consistently with CSV values while preserving meaningful rich-text whitespace.

## Acceptance matrix

| Criterion | Result | Evidence / limit |
|---|---|---|
| Shared template → preview → commit flow on all nine lists | Pass in exercised cases | All 11 existing CSV browser scenarios passed in the combined run, including all nine lists. |
| Templates and field help derive from the same definitions | Pass | Registry is used by parser, serializer and dialog. |
| UTF-8/BOM, quoting, multiline cells, CRLF, leading-zero identifiers | Pass in fixtures | Existing parser fixtures passed; exact 128 KiB single-field boundary was additionally accepted. |
| Unknown/duplicate/prohibited headers, required values, enums, ranges, dates, URLs | Pass in existing fixtures; incomplete overall | Indexed-string limits are missing (R5). |
| File and multipart input bounds before parsing | Pass in exercised cases | Streaming multipart bound, over-limit unit case, and creation-route oversized request checks passed. |
| Bounded diagnostics and reliable row numbers | Fail | R4 and blank-line row labels. |
| Exact trimmed relationship matching and ambiguity rejection | Fail | R2; ordinary exact matching and cross-user rejection passed. |
| Identical skips, conflicts block all writes, omitted optional columns | Pass in main scenarios; edge gap | Duplicate/conflict/ambiguity tests passed; empty-string/null edge remains. |
| Goals grouped consistently, milestones ordered, ranges validated | Pass in exercised cases | Parser and PostgreSQL tests passed; completion state is excluded from comparison. |
| Goal display/edit date round-trips | Fail | R1. |
| Preview performs no writes | Pass in exercised cases | Service audit and direct database probe. |
| Explicit owner-scoped writes and rejection of cross-user links | Pass in exercised write paths | PostgreSQL tests cover parent/join ownership and cross-user references. Duplicate-comparison nested includes are scoped by parent only, not independently by join/related ownership; legacy contaminated joins need additional review. |
| Signed confirmation, file/user binding, expiry and stale references | Pass in existing tests | Forged/mismatched/expired token and deleted-reference cases passed. |
| Atomic parents, joins, milestones and receipt | Pass in exercised cases | Injected child failure leaves no parents/receipt. |
| Serializable concurrency and real conflict retry | Pass | Additional barrier-controlled PostgreSQL probe forced one P2034; three transaction attempts returned matching receipts and one story. |
| Receipt replay and UUID reuse rejection | Pass for identical text; edge gap | Concurrent replay and changed-payload rejection passed. UUID casing fails replay. Post-expiry replay is supported by code but was not time-advanced in this review. |
| 1,000 representative records within budget | Pass locally | 1,000 questions, rich content, 2,000 topic joins and 2,000 company joins: 3,251 ms including preview. Simple company batch: 394 ms. This is a local disposable database benchmark. |
| New unlinked topics appear at zero metrics | Pass in browser cases | Topic creation and import flows passed. Existing linked-topic calculation remains in place. |
| No synthetic activity history | Pass in exercised cases | Database assertions for attempts, submissions, revisions and daily progress passed. |
| Export escaping and reimport | Fail for supported platform; partial otherwise | Quoted-content parser round-trip test passed. GeeksforGeeks is rejected (R7); empty-string/null comparison also has an edge case. No new end-to-end historical-dataset export test was added. |
| Modal validation, retries, refresh and responsive layout | Mostly pass | Four creation browser scenarios passed in full run; R6 failed. Mobile viewport/error visibility passed. |
| Unsaved draft protection | Partial / fail for Back | Cancel/Escape protection passed; client-side history navigation loses the draft (R3). |
| Accessible error focus and keyboard operation | Partial | Keyboard opening/Escape tested; R6 remains. No screen-reader or automated full accessibility audit was run. |
| Receipt migration on disposable database | Pass for new migration | Test helper applies the receipt SQL on a schema bootstrapped using `db push`. Full migration history and application deployment are separate concerns. |

## Verification results

- Unit/regression run: **113 passed, 0 failed**.
- Combined isolated PostgreSQL suites: **18 passed, 0 failed** (includes two parent test containers and 16 scenarios).
- Combined browser run: **15 passed, 1 failed**. The failing case is R6.
- Focused repeat of the failing browser case: **5 passed**. This does not erase the full-run failure.
- Additional probes: real PostgreSQL trimmed-name ambiguity/missing-reference cases, UUID casing, forced P2034 retry, rich 1,000-row import, indexed-name overflow; Chromium timezone/display/edit, dialog reopen and client-side Back; parser blank-line rows; diagnostic response amplification.
- Empty-database `prisma migrate deploy`: **failed** at the pre-existing `20260620000000_add_user_timezone` migration with P3018 / PostgreSQL 42P01 (`users` does not exist). The isolated schema was removed. The new receipt migration succeeds against the bootstrapped current schema, but a complete clean-install migration path is not established. Deployment to the application database was not performed or verified.
- Fresh production build (`next build`, existing generated Prisma client): **passed**, including TypeScript checks. No schema/client changes were made during the review.
- Repository-wide lint: **failed with 338 errors and 5,017 warnings**, matching the preceding implementation baseline. The new import/create modules and components have no entries in that lint report. Existing middleware deprecation/build warnings remain.

The sections above record the original review, before application fixes. The follow-up below supersedes the open-finding status; the historical results are retained for traceability.


## Fix follow-up — 2026-09-26

All seven identified application defects and the four additional edge cases have been addressed:

- **R1:** persisted goal dates render/edit in UTC date-only form; new-form defaults use the local calendar. Overdue comparisons use calendar days so a deadline remains current throughout its day.
- **R2:** relationships resolve against trimmed owned catalog names before ambiguity checks. PostgreSQL regression covers both a whitespace-only match and a subsequent collision invalidating a preview.
- **R3:** verified-account-scoped tab memory retains question/topic drafts across client navigation, including edited slugs, selections, and unfinished inline topics. Explicit discard/success clears drafts. Reload/tab-close protection remains the existing unload warning; accepting document unload discards memory-only drafts.
- **R4:** parser and relationship diagnostics retain at most 200 details per collection, count all diagnostics, and bound column/message length. The UI paginates 20 details at a time. A 50,000-error fixture is blocked without a token and returns under 1.1 MB including normalized rows.
- **R5:** the shared registry exposes an 800-UTF-8-byte bound for short text and individual relationship/tag values, enforced before persistence and documented in field help. Rich fields retain the record-size bound. Confirmation schema version is now 2.
- **R6:** failed-submit focus runs after errors/expanded sections render and disabled controls re-enable, retries briefly for mounting controls, and cancels on unmount. Blur validation does not request focus. Sheet title/description render while account verification loads.
- **R7:** the problem form and CSV definitions now use one supported-platform list, including GeeksforGeeks. Regression checks canonical comparison for exports from every supported platform.
- Blank lines now contribute to logical CSV row numbers, including leading blanks before the header; quoted multiline cells remain one logical record.
- Receipt request UUIDs normalize to lowercase before lookup/storage; PostgreSQL replay regression passes.
- Reopening CSV import displays the retained filename/size explicitly.
- Blank optional stored strings compare consistently with blank CSV cells/defaults without changing meaningful rich-text whitespace.

### Scope and limits

All verification writes use disposable PostgreSQL schemas; no application database migration or data changes were performed. The original clean-install migration-history failure and unrelated repository-wide lint failures remain outside these fixes. The receipt migration continues to be exercised on the disposable current-schema baseline. No new screen-reader, Safari/Firefox, or legacy contaminated-join audit is claimed. Passing automated tests provides evidence for the exercised cases, not a guarantee of zero defects.


### Verification after fixes

- Full unit/regression suite: **117 passed, 0 failed** on the final source.
- Isolated PostgreSQL suites: **20 passed, 0 failed**, including the new trimmed-name collision/stale-preview and UUID-casing receipt cases. The disposable helper exercised the receipt migration. A 1,000-company import including preview completed in **1,979 ms** locally.
- Final combined Chromium browser suite: **22 passed, 0 failed** against the final production build. This covers every list, UTC/Los Angeles/Dhaka goal display/edit/save round-trips, diagnostic pagination, retained filenames, question/topic Back/Forward draft recovery (including inline topic state), explicit discard, mobile recovery, and error focus.
- An earlier browser run had **21 passes and one test-selector failure**: the new diagnostic test matched both the footer Close button and the icon Close button. Its selector was narrowed, then the entire suite above was rerun successfully.
- Final production build: **passed**, including TypeScript. A standalone TypeScript check also passed before the final small adjustments; the final build checked those adjustments.
- Targeted lint over import/create code, touched goal/problem form files, and regressions: **0 errors, 1 pre-existing goals-page effect warning**. New import/create modules have no lint findings. Repository-wide lint was not repeated in this fix pass; the unchanged unrelated failures are documented in the original review above.
- `git diff --check`: passed (Git reported only the workspace's line-ending conversion notices).

- Previously intermittent lost-response/invalid-slug focus scenario repeated against the final build: **5 passed, 0 failed** (`--repeat-each=5`).

The identified application findings are resolved with the evidence above. Release limitations remain the historical migration-chain failure and unrelated repository-wide lint failures; neither was modified as part of these scoped fixes.
