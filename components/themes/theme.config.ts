/**
 * Default theme that loads when no user preference is set.
 * Change this value to set a different default theme.
 */
export const DEFAULT_THEME = "vercel";

export const THEMES = [
  { name: "Vercel", value: "vercel" },
  { name: "Claude", value: "claude" },
  { name: "Supabase", value: "supabase" },
  { name: "Mono", value: "mono" },
  { name: "Notebook", value: "notebook" },
  { name: "Neobrutualism", value: "neobrutualism" },
  { name: "Light Green", value: "light-green" },
  { name: "Zen", value: "zen" },
  { name: "Astro Vista", value: "astro-vista" },
  { name: "WhatsApp", value: "whatsapp" },
] as const;

export const THEME_VALUES = THEMES.map((t) => t.value);

export function isValidTheme(value: string | undefined): value is string {
  return !!value && THEME_VALUES.includes(value as (typeof THEMES)[number]["value"]);
}
