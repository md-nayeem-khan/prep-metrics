import test from "node:test";
import assert from "node:assert/strict";

import { getSafeNextPath } from "../lib/utils";

test("getSafeNextPath returns internal absolute paths unchanged", () => {
  assert.equal(getSafeNextPath("/dashboard"), "/dashboard");
  assert.equal(getSafeNextPath("/problems"), "/problems");
  assert.equal(getSafeNextPath("/settings?tab=account"), "/settings?tab=account");
});

test("getSafeNextPath falls back to /dashboard for empty values", () => {
  assert.equal(getSafeNextPath(null), "/dashboard");
  assert.equal(getSafeNextPath(undefined), "/dashboard");
  assert.equal(getSafeNextPath(""), "/dashboard");
});

test("getSafeNextPath rejects open-redirect payloads", () => {
  // Protocol-relative and backslash variants resolve to external origins in a URL/router.
  assert.equal(getSafeNextPath("//evil.com"), "/dashboard");
  assert.equal(getSafeNextPath("/\\evil.com"), "/dashboard");
  // Absolute and scheme-prefixed URLs are not internal paths.
  assert.equal(getSafeNextPath("https://evil.com"), "/dashboard");
  assert.equal(getSafeNextPath("javascript:alert(1)"), "/dashboard");
  // Relative paths without a leading slash are rejected too.
  assert.equal(getSafeNextPath("dashboard"), "/dashboard");
});
