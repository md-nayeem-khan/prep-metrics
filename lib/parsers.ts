import { createParser } from "nuqs/server";

import type { ExtendedColumnSort } from "@/types/data-table";

function isSortingState(value: unknown): value is { id: string; desc: boolean }[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        item &&
        typeof item === "object" &&
        typeof (item as { id?: unknown }).id === "string" &&
        typeof (item as { desc?: unknown }).desc === "boolean",
    )
  );
}

export const getSortingStateParser = <TData>(
  columnIds?: string[] | Set<string>,
) => {
  const validKeys = columnIds
    ? columnIds instanceof Set
      ? columnIds
      : new Set(columnIds)
    : null;

  return createParser({
    parse: (value: string) => {
      try {
        const parsed = JSON.parse(value);
        if (!isSortingState(parsed)) return null;
        if (validKeys && parsed.some((item) => !validKeys.has(item.id))) {
          return null;
        }
        return parsed as ExtendedColumnSort<TData>[];
      } catch {
        return null;
      }
    },
    serialize: (value: ExtendedColumnSort<TData>[]) => JSON.stringify(value),
    eq: (a: ExtendedColumnSort<TData>[], b: ExtendedColumnSort<TData>[]) =>
      a.length === b.length &&
      a.every(
        (item, index) =>
          item.id === b[index]?.id && item.desc === b[index]?.desc,
      ),
  });
};
