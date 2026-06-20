/**
 * Theme-aware, dark-mode-safe status color utilities.
 *
 * These return flat tinted utility classes (no gradients, glows, or
 * `text-white`-on-tint) that read correctly in light and dark mode and across
 * every theme. Use them for semantic color coding of difficulty, priority,
 * status, and trend indicators instead of hardcoding colors at call sites.
 */

type Tone = "emerald" | "amber" | "red" | "blue" | "slate" | "violet"

/** Soft tinted badge surface for a given semantic tone. */
function toneBadge(tone: Tone): string {
  const map: Record<Tone, string> = {
    emerald:
      "bg-emerald-500/10 text-emerald-700 border-emerald-500/20 dark:text-emerald-400",
    amber:
      "bg-amber-500/10 text-amber-700 border-amber-500/20 dark:text-amber-400",
    red: "bg-red-500/10 text-red-700 border-red-500/20 dark:text-red-400",
    blue: "bg-blue-500/10 text-blue-700 border-blue-500/20 dark:text-blue-400",
    violet:
      "bg-violet-500/10 text-violet-700 border-violet-500/20 dark:text-violet-400",
    slate: "bg-muted text-muted-foreground border-border",
  }
  return map[tone]
}

/** Problem difficulty: easy / medium / hard (anything else → neutral). */
export function difficultyBadge(difficulty: string): string {
  switch (difficulty?.toLowerCase()) {
    case "easy":
      return toneBadge("emerald")
    case "medium":
      return toneBadge("amber")
    case "hard":
      return toneBadge("red")
    default:
      return toneBadge("slate")
  }
}

/** Goal priority: critical / high / medium / low. */
export function priorityBadge(priority: string): string {
  switch (priority?.toLowerCase()) {
    case "critical":
      return toneBadge("red")
    case "high":
      return toneBadge("amber")
    case "medium":
      return toneBadge("blue")
    case "low":
      return toneBadge("slate")
    default:
      return toneBadge("slate")
  }
}

/** Solved / in-progress status pill. */
export function solvedBadge(isSolved: boolean): string {
  return isSolved ? toneBadge("emerald") : toneBadge("amber")
}

/** Generic status pill for known interview/submission states. */
export function statusBadge(status: string): string {
  switch (status?.toLowerCase()) {
    case "solved":
    case "completed":
    case "passed":
    case "success":
      return toneBadge("emerald")
    case "in_progress":
    case "in-progress":
    case "scheduled":
    case "pending":
      return toneBadge("amber")
    case "failed":
    case "cancelled":
    case "error":
      return toneBadge("red")
    default:
      return toneBadge("slate")
  }
}

/** Trend / delta text color: positive (improvement) → green, negative → red. */
export function trendText(positive: boolean): string {
  return positive
    ? "text-emerald-600 dark:text-emerald-400"
    : "text-red-600 dark:text-red-400"
}
