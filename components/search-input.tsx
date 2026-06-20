"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2, Code2, SearchX, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface QuickResult {
  id: number;
  title: string;
  problemId: string;
  platform: string;
  difficulty: string;
  patterns: { id: number; name: string }[];
}

function difficultyStyles(difficulty: string) {
  switch (difficulty?.toLowerCase()) {
    case "easy":
      return {
        badge: "bg-green-500/10 text-green-600 dark:text-green-400",
        icon: "bg-green-500/10 text-green-600 dark:text-green-400",
      };
    case "hard":
      return {
        badge: "bg-red-500/10 text-red-600 dark:text-red-400",
        icon: "bg-red-500/10 text-red-600 dark:text-red-400",
      };
    default:
      return {
        badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
        icon: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
      };
  }
}

export function SearchInput() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<QuickResult[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  React.useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/problems?search=${encodeURIComponent(query)}&limit=6`,
          { signal: controller.signal }
        );
        if (res.ok) {
          const data = await res.json();
          setResults(Array.isArray(data.problems) ? data.problems : []);
        }
      } catch (err) {
        if ((err as Error).name !== "AbortError") setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  const handleSelect = (id: number) => {
    setOpen(false);
    router.push(`/problems/${id}`);
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    setOpen(false);
    router.push(`/problems?search=${encodeURIComponent(query.trim())}`);
  };

  const showIdle = query.length < 2 && !isLoading;
  const showNoResults = !isLoading && query.length >= 2 && results.length === 0;

  return (
    <>
      <Button
        variant="outline"
        className="bg-background text-muted-foreground relative h-9 w-full justify-start rounded-[0.5rem] text-sm font-normal shadow-none sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 size-4 shrink-0" />
        <span>Search problems…</span>
        <kbd className="bg-muted pointer-events-none absolute top-[0.3rem] right-[0.3rem] hidden h-6 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen} shouldFilter={false} className="sm:max-w-2xl">
        <CommandInput
          placeholder="Search problems, patterns…"
          value={query}
          onValueChange={setQuery}
          onKeyDown={(e) => {
            if (e.key === "Enter" && query.trim()) handleSearch();
          }}
        />

        <CommandList className="max-h-[480px]">
          {/* Idle state */}
          {showIdle && (
            <div className="flex flex-col items-center justify-center py-10 text-center select-none">
              <Search className="size-10 text-muted-foreground/25 mb-3" />
              <p className="text-sm font-medium text-muted-foreground">
                Search problems by title, pattern, or ID
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                Try &quot;two sum&quot;, &quot;sliding window&quot;, or &quot;LC-1&quot;
              </p>
            </div>
          )}

          {/* Loading */}
          {isLoading && (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="size-5 animate-spin text-muted-foreground" />
            </div>
          )}

          {/* No results */}
          {showNoResults && (
            <CommandEmpty>
              <div className="flex flex-col items-center gap-2 py-4">
                <SearchX className="size-8 text-muted-foreground/40" />
                <p className="text-sm text-muted-foreground">
                  No problems found for &quot;{query}&quot;
                </p>
                <p className="text-xs text-muted-foreground/60">
                  Try a different title, pattern name, or LC number
                </p>
              </div>
            </CommandEmpty>
          )}

          {/* Results */}
          {results.length > 0 && (
            <CommandGroup heading="Problems">
              {results.map((p) => {
                const styles = difficultyStyles(p.difficulty);
                return (
                  <CommandItem
                    key={p.id}
                    value={`${p.title}-${p.id}`}
                    onSelect={() => handleSelect(p.id)}
                    className="flex items-center gap-3 py-2.5"
                  >
                    <div
                      className={cn(
                        "flex size-8 shrink-0 items-center justify-center rounded-md",
                        styles.icon
                      )}
                    >
                      <Code2 className="size-4" />
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <span className="truncate text-sm font-medium leading-none">
                        {p.title}
                      </span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className={cn(
                            "inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-semibold leading-none",
                            styles.badge
                          )}
                        >
                          {p.difficulty}
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                          {p.platform}
                        </span>
                        {p.patterns?.[0] && (
                          <>
                            <span className="text-[11px] text-muted-foreground/50">·</span>
                            <span className="text-[11px] text-muted-foreground truncate">
                              {p.patterns[0].name}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <span className="shrink-0 font-mono text-[11px] text-muted-foreground/60">
                      {p.problemId}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}

          {/* Search all action */}
          {query.trim() && (
            <CommandGroup heading="Actions">
              <CommandItem
                onSelect={handleSearch}
                className="flex items-center gap-3 py-2.5"
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted">
                  <Search className="size-4 text-muted-foreground" />
                </div>
                <span className="flex-1 text-sm">
                  Search all problems for{" "}
                  <span className="font-medium">&quot;{query.trim()}&quot;</span>
                </span>
                <ArrowRight className="size-3.5 shrink-0 text-muted-foreground/60" />
              </CommandItem>
            </CommandGroup>
          )}
        </CommandList>

        {/* Footer keyboard hints */}
        <div className="flex items-center gap-4 border-t px-4 py-2 text-xs text-muted-foreground">
          <span>
            <kbd className="mr-1 rounded border bg-muted px-1 font-mono">↵</kbd>
            to open
          </span>
          <span>
            <kbd className="mr-1 rounded border bg-muted px-1 font-mono">↑↓</kbd>
            to navigate
          </span>
          <span>
            <kbd className="mr-1 rounded border bg-muted px-1 font-mono">esc</kbd>
            to close
          </span>
        </div>
      </CommandDialog>
    </>
  );
}
