// Resolves the authenticated user's IANA timezone for server-side day bucketing.
//
// Route handlers call getUserTimezone() once near the top and thread the result into the pure tz.ts
// helpers (which take `tz` as a parameter and stay testable). Falls back to "UTC" whenever there is no
// authenticated user, the stored value is invalid, or we are outside a request scope (tests/scripts) —
// the same defensive posture as getCurrentUserId in lib/prisma.ts.

import { headers } from "next/headers";
import type { NextRequest } from "next/server";
import { authPrisma } from "@/lib/prisma";
import { isValidTimeZone } from "@/lib/datetime/tz";

async function lookup(userId: string): Promise<string> {
  const user = await authPrisma.user.findUnique({
    where: { id: userId },
    select: { timezone: true },
  });
  return user?.timezone && isValidTimeZone(user.timezone) ? user.timezone : "UTC";
}

// Reads the user id from the middleware-injected request header context. Use inside route handlers.
export async function getUserTimezone(): Promise<string> {
  try {
    const requestHeaders = await headers();
    const userId = requestHeaders.get("x-authenticated-user-id");
    return userId ? lookup(userId) : "UTC";
  } catch {
    return "UTC";
  }
}

// Same, but reads from an explicit NextRequest (handy where the request object is already in scope).
export async function getUserTimezoneFromRequest(request: NextRequest): Promise<string> {
  try {
    const userId = request.headers.get("x-authenticated-user-id");
    return userId ? lookup(userId) : "UTC";
  } catch {
    return "UTC";
  }
}
