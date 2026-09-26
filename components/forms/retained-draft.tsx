"use client";

import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { Button } from '@/components/ui/button';

// Memory only: retained across client navigation, scoped to the verified account.
// Never put private question content in shared localStorage.
const drafts = new Map<string, unknown>();
export function clearDraft(owner: string, kind: string) { drafts.delete(`${owner}:${kind}`); }
export function useRetainedDraft<T>(owner: string, kind: string, initial: T): [T, Dispatch<SetStateAction<T>>, () => void] {
  const key = `${owner}:${kind}`;
  const [value, setValue] = useState<T>(() => drafts.get(key) as T ?? initial);
  const update: Dispatch<SetStateAction<T>> = next => setValue(previous => {
    const result = typeof next === 'function' ? (next as (value: T) => T)(previous) : next;
    drafts.set(key, result);
    return result;
  });
  return [value, update, () => drafts.delete(key)];
}
export function DraftOwner({ children }: { children: (owner: string) => React.ReactNode }) {
  const [owner, setOwner] = useState('');
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/auth/me', { cache: 'no-store', signal: controller.signal }).then(async response => {
      if (!response.ok) throw new Error();
      const body = await response.json();
      if (typeof body.data?.id !== 'string') throw new Error();
      if (!controller.signal.aborted) setOwner(body.data.id);
    }).catch(() => { if (!controller.signal.aborted) setError(true); });
    return () => controller.abort();
  }, [attempt]);
  if (!owner) return <div role="status" className="p-6">{error ? <>Could not load your draft. <Button variant="outline" onClick={() => { setError(false); setAttempt(n => n + 1); }}>Retry</Button></> : 'Loading your draft…'}</div>;
  return children(owner);
}
