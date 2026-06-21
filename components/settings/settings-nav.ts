import { Database, Palette, Shield, User } from "lucide-react";

export type SectionId = "profile" | "appearance" | "security" | "data";

export const NAV_ITEMS: {
  id: SectionId;
  label: string;
  description: string;
  icon: React.ElementType;
}[] = [
  { id: "profile", label: "Profile", description: "Personal information", icon: User },
  { id: "appearance", label: "Appearance", description: "Theme & display", icon: Palette },
  { id: "security", label: "Security", description: "Password & access", icon: Shield },
  { id: "data", label: "Data", description: "Export & backups", icon: Database },
];

const SECTION_IDS = new Set<string>(NAV_ITEMS.map((item) => item.id));

/** Narrow an arbitrary string (e.g. a URL `?tab=` value) to a valid SectionId, defaulting to "profile". */
export function asSectionId(value: string | null | undefined): SectionId {
  return value && SECTION_IDS.has(value) ? (value as SectionId) : "profile";
}
