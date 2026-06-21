import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Accepts only same-origin absolute paths for post-login redirects. Rejects
// protocol-relative ("//x"), backslash ("/\x"), and any non-internal value to
// prevent open redirects. Falls back to /dashboard.
export function getSafeNextPath(next: string | null | undefined): string {
  if (!next) return "/dashboard";
  if (!next.startsWith("/")) return "/dashboard";
  if (next.startsWith("//") || next.startsWith("/\\")) return "/dashboard";
  return next;
}

export const formatDate = (dateString: string, tz?: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    ...(tz ? { timeZone: tz } : {}),
  });
};
