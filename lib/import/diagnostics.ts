import type { ImportIssue } from './definitions';

export const MAX_DIAGNOSTICS = 200;
export type Diagnostics = ImportIssue[] & { readonly total: number };
// Plain arrays retain JSON/test compatibility; metadata is deliberately non-enumerable.
export function diagnostics(): Diagnostics {
  const items: ImportIssue[] = [];
  let total = 0;
  Object.defineProperty(items, 'total', { get: () => total });
  Object.defineProperty(items, 'push', { value: (...next: ImportIssue[]) => {
    total += next.length;
    for (const item of next) if (items.length < MAX_DIAGNOSTICS) Array.prototype.push.call(items, { ...item, column: item.column.slice(0, 160), message: item.message.slice(0, 400) });
    return items.length;
  } });
  return items as Diagnostics;
}
