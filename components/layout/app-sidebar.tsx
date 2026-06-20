"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Code2 } from "lucide-react";

import { type NavItem, navGroups } from "@/config/nav";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { UserNav } from "@/components/layout/user-nav";

function collectAllUrls(items: NavItem[]): string[] {
  return items.flatMap((item) => [
    item.url,
    ...(item.items?.length ? collectAllUrls(item.items) : []),
  ]);
}

// All known nav URLs — prevents a parent-prefixed URL from matching when a
// more-specific sibling nav item exactly owns the current pathname.
const allNavUrls = new Set(navGroups.flatMap((g) => collectAllUrls(g.items)));

function isNavItemActive(url: string, pathname: string): boolean {
  return (
    pathname === url ||
    (!allNavUrls.has(pathname) && pathname.startsWith(url + "/"))
  );
}

function isAnyChildActive(items: NavItem[], pathname: string): boolean {
  return items.some(
    (item) =>
      isNavItemActive(item.url, pathname) ||
      (item.items?.length ? isAnyChildActive(item.items, pathname) : false),
  );
}

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <Link href="/dashboard">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg">
                  <Code2 className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">AlgoMetrics</span>
                  <span className="truncate text-xs">Interview Prep</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {navGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map((item) => {
                const hasChildren = !!item.items?.length;
                const isActive =
                  isNavItemActive(item.url, pathname) ||
                  (hasChildren ? isAnyChildActive(item.items!, pathname) : false);

                if (hasChildren) {
                  return (
                    <Collapsible
                      key={item.url}
                      asChild
                      defaultOpen={isActive || item.isActive}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={item.title} isActive={isActive}>
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items!.map((child) => (
                              <SidebarMenuSubItem key={child.url}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={isNavItemActive(child.url, pathname)}
                                >
                                  <Link href={child.url}>{child.title}</Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }

                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                      <Link href={item.url}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <UserNav />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
