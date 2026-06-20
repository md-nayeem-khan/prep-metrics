"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronsUpDown, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

interface MultiSelectOption {
  value: string;
  label: string;
}

interface SearchableMultiSelectProps {
  options: MultiSelectOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder: string;
  searchPlaceholder: string;
  emptyText?: string;
  disabled?: boolean;
  className?: string;
}

export function SearchableMultiSelect({
  options,
  selectedValues,
  onChange,
  placeholder,
  searchPlaceholder,
  emptyText = "No matching options",
  disabled = false,
  className,
}: SearchableMultiSelectProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (!rootRef.current) return;
      const target = event.target as Node | null;
      if (target && !rootRef.current.contains(target)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const selectedSet = useMemo(() => new Set(selectedValues), [selectedValues]);

  const filteredOptions = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return options;

    return options.filter((option) => option.label.toLowerCase().includes(normalized));
  }, [options, query]);

  const selectedLabels = useMemo(() => {
    const labelsByValue = new Map(options.map((option) => [option.value, option.label]));
    return selectedValues
      .map((value) => labelsByValue.get(value))
      .filter((label): label is string => Boolean(label));
  }, [options, selectedValues]);

  const toggleValue = (value: string) => {
    if (selectedSet.has(value)) {
      onChange(selectedValues.filter((item) => item !== value));
      return;
    }
    onChange([...selectedValues, value]);
  };

  const clearSelection = () => onChange([]);

  const triggerLabel =
    selectedLabels.length === 0
      ? placeholder
      : selectedLabels.length <= 2
        ? selectedLabels.join(", ")
        : `${selectedLabels.slice(0, 2).join(", ")} +${selectedLabels.length - 2}`;

  return (
    <div className="relative" ref={rootRef}>
      <Button
        type="button"
        variant="outline"
        className={`h-auto min-h-10 w-full justify-between py-2 text-left font-normal ${className || ""}`}
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="truncate text-sm">{triggerLabel}</span>
        <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-60" />
      </Button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-[70] mt-2 rounded-lg border bg-popover p-3 text-popover-foreground shadow-md ring-1 ring-foreground/10">
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={searchPlaceholder}
                className="pl-8"
              />
            </div>

            {selectedLabels.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {selectedLabels.slice(0, 3).map((label) => (
                  <Badge key={label} variant="secondary" className="text-xs">
                    {label}
                  </Badge>
                ))}
                {selectedLabels.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{selectedLabels.length - 3} more
                  </Badge>
                )}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs"
                  onClick={clearSelection}
                >
                  <X className="mr-1 h-3 w-3" />
                  Clear
                </Button>
              </div>
            )}

            <div
              className="max-h-56 overflow-y-auto rounded-md border p-1 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border/80 [&::-webkit-scrollbar-track]:bg-transparent"
              onWheel={(event) => event.stopPropagation()}
            >
              {filteredOptions.length === 0 ? (
                <p className="px-2 py-4 text-sm text-muted-foreground">{emptyText}</p>
              ) : (
                filteredOptions.map((option) => {
                  const isChecked = selectedSet.has(option.value);
                  return (
                    <div
                      key={option.value}
                      role="button"
                      tabIndex={0}
                      onClick={() => toggleValue(option.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          toggleValue(option.value);
                        }
                      }}
                      className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={() => toggleValue(option.value)}
                        onClick={(event) => event.stopPropagation()}
                      />
                      <span className="flex-1 truncate">{option.label}</span>
                      {isChecked && <Check className="h-3.5 w-3.5 text-primary" />}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
