import {
  BookOpen,
  Bookmark,
  Brain,
  Building2,
  Flag,
  Layers,
  LayoutDashboard,
  MessageSquare,
  Network,
  RotateCcw,
  Target,
  Users,
} from "lucide-react";

export type NavItem = {
  title: string;
  url: string;
  icon?: React.ElementType;
  shortcut?: string[];
  isActive?: boolean;
  items?: NavItem[];
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

export const navGroups: NavGroup[] = [
  {
    label: "General",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        shortcut: ["d", "d"],
      },
      {
        title: "Goals",
        url: "/goals",
        icon: Flag,
        shortcut: ["g", "g"],
      },
      {
        title: "Mock Interviews",
        url: "/mock",
        icon: Target,
        shortcut: ["m", "m"],
      },
    ],
  },
  {
    label: "Coding",
    items: [
      {
        title: "Problems",
        url: "/problems",
        icon: BookOpen,
        shortcut: ["p", "p"],
      },
      {
        title: "Patterns",
        url: "/patterns",
        icon: Brain,
        shortcut: ["t", "t"],
      },
      {
        title: "Company",
        url: "/company",
        icon: Building2,
        shortcut: ["c", "c"],
      },
      {
        title: "Revision",
        url: "/revision",
        icon: RotateCcw,
        shortcut: ["r", "r"],
      },
    ],
  },
  {
    label: "System Design",
    items: [
      {
        title: "Questions",
        url: "/system-design",
        icon: Network,
        shortcut: ["x", "x"],
      },
      {
        title: "Topics",
        url: "/system-design/topics",
        icon: Layers,
        shortcut: ["x", "t"],
      },
    ],
  },
  {
    label: "Behavioral",
    items: [
      {
        title: "Questions",
        url: "/behavioral",
        icon: MessageSquare,
        shortcut: ["b", "b"],
      },
      {
        title: "Story Bank",
        url: "/behavioral/stories",
        icon: Bookmark,
        shortcut: ["b", "s"],
      },
      {
        title: "Competencies",
        url: "/behavioral/competencies",
        icon: Users,
        shortcut: ["b", "c"],
      },
    ],
  },
];

function flattenItems(items: NavItem[]): NavItem[] {
  return items.flatMap((item) =>
    item.items?.length ? flattenItems(item.items) : [item],
  );
}

// Flat list of all leaf items (navigable routes) for breadcrumbs, kbar, etc.
export const navItems: NavItem[] = navGroups.flatMap((g) =>
  flattenItems(g.items),
);
