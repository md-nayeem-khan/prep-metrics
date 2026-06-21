"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Fallback list when Intl.supportedValuesOf is unavailable (older runtimes).
const FALLBACK_TIMEZONES = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Sao_Paulo",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Africa/Cairo",
  "Asia/Dubai",
  "Asia/Karachi",
  "Asia/Kolkata",
  "Asia/Dhaka",
  "Asia/Singapore",
  "Asia/Shanghai",
  "Asia/Tokyo",
  "Australia/Sydney",
  "Pacific/Auckland",
];

function getTimezones(): string[] {
  try {
    const supported = (Intl as any).supportedValuesOf?.("timeZone");
    if (Array.isArray(supported) && supported.length > 0) return supported;
  } catch {
    /* fall through */
  }
  return FALLBACK_TIMEZONES;
}

// The current UTC offset label for a zone, e.g. "GMT+5:30", for display alongside the name.
function offsetLabel(tz: string): string {
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      timeZoneName: "shortOffset",
    }).formatToParts(new Date());
    return parts.find((p) => p.type === "timeZoneName")?.value ?? "";
  } catch {
    return "";
  }
}

export function TimezoneCombobox({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (tz: string) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const timezones = React.useMemo(getTimezones, []);

  // Offset labels are derived from Intl, whose output can differ between the Node server (e.g. "GMT")
  // and the browser (e.g. "GMT+0"). Rendering them only after mount keeps the SSR and first client
  // render identical, avoiding a hydration mismatch.
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className="w-full justify-between font-normal"
        >
          <span className="flex min-w-0 items-center gap-2">
            <Globe className="size-4 shrink-0 text-muted-foreground" />
            <span className="truncate">{(value || "Select timezone").replace(/_/g, " ")}</span>
            {value && mounted && (
              <span className="shrink-0 text-xs text-muted-foreground">{offsetLabel(value)}</span>
            )}
          </span>
          <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        style={{ width: "var(--radix-popover-trigger-width)" }}
        align="start"
      >
        <Command>
          <CommandInput placeholder="Search timezone…" />
          <CommandList>
            <CommandEmpty>No timezone found.</CommandEmpty>
            <CommandGroup>
              {timezones.map((tz) => (
                <CommandItem
                  key={tz}
                  value={tz}
                  onSelect={() => {
                    onChange(tz);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 size-4",
                      value === tz ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="flex-1 truncate">{tz.replace(/_/g, " ")}</span>
                  <span className="ml-2 text-xs text-muted-foreground">{mounted ? offsetLabel(tz) : ""}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
