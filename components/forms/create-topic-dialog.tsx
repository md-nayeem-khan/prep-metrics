"use client";

import { DraftOwner, useRetainedDraft, clearDraft } from './retained-draft';
import { useEffect, useRef, useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FieldGroup } from '@/components/ui/field';
import { CreateValidationError, TOPIC_CATEGORIES, validateCreate, type FieldErrors } from '@/lib/system-design-create';
import { DiscardDraft, useInvalidFocus, TextField } from './system-design-fields';

export type CreatedTopic = { id: number; name: string; category: string };
export function TopicEditor({ owner, onCreated, onStateChange, onCancel, inline = false }: {
  owner: string; onCreated: (topic: CreatedTopic) => void; onStateChange: (state: { dirty: boolean; busy: boolean }) => void; onCancel: () => void; inline?: boolean;
}) {
  const [draft, setDraft, clearTopic] = useRetainedDraft(owner, inline ? 'inline-topic' : 'topic', { name: '', category: '', description: '' });
  const [fields, setFields] = useState<FieldErrors>({});
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const lock = useRef(false);
  const root = useRef<HTMLFieldSetElement>(null);
  const focusInvalid = useInvalidFocus(root, busy);
  const dirty = Object.values(draft).some(Boolean);
  useEffect(() => onStateChange({ dirty, busy }), [dirty, busy, onStateChange]);
  useEffect(() => {
    if (!dirty || inline) return;
    const handler = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ''; };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [dirty, inline]);
  async function save() {
    if (lock.current) return;
    setError('');
    try { validateCreate('topic', draft); }
    catch (error) { if (error instanceof CreateValidationError) { setFields(error.fields); focusInvalid(error.fields); } return; }
    lock.current = true; setBusy(true); setFields({});
    try {
      const response = await fetch('/api/system-design/topics', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(draft) });
      const result = await response.json();
      if (!response.ok) { setFields(result.fields ?? {}); setError(result.error ?? 'Unable to create topic.'); focusInvalid(result.fields ?? {}); return; }
      clearTopic();
      toast.success('Topic created');
      onCreated(result.topic);
    } catch { setError('Unable to confirm the save. Your draft is preserved. Retry; a duplicate name will not create another topic.'); }
    finally { lock.current = false; setBusy(false); }
  }
  function blur(key: string) {
    try { validateCreate('topic', draft); setFields(previous => ({ ...previous, [key]: '' })); }
    catch (error) { if (error instanceof CreateValidationError) setFields(previous => ({ ...previous, [key]: error.fields[key] ?? '' })); }
  }
  return <fieldset ref={root} disabled={busy} className="flex min-w-0 flex-col gap-5" data-topic-editor onKeyDown={event => {
    if (event.key === 'Enter' && event.target instanceof HTMLInputElement) { event.preventDefault(); event.stopPropagation(); void save(); }
  }}>
    {inline && <legend className="mb-4 font-medium">Create a topic</legend>}
    <FieldGroup>
      <TextField name="name" label="Topic name" value={draft.name} required placeholder="e.g. Consistent hashing" error={fields.name} onBlur={() => blur('name')} onChange={name => setDraft(previous => ({ ...previous, name }))} />
      <TextField name="category" label="Topic category" value={draft.category} required suggestions={TOPIC_CATEGORIES} placeholder="Choose or enter a category" error={fields.category} onBlur={() => blur('category')} onChange={category => setDraft(previous => ({ ...previous, category }))} />
      <TextField name="description" label="Description" value={draft.description} multiline error={fields.description} onBlur={() => blur('description')} onChange={description => setDraft(previous => ({ ...previous, description }))} />
    </FieldGroup>
    {(error || fields._form) && <Alert variant="destructive" role="alert"><AlertDescription>{error || fields._form}</AlertDescription></Alert>}
    <div className="flex justify-end gap-2">
      <Button type="button" variant="outline" disabled={busy} onClick={onCancel}>Cancel</Button>
      <Button type="button" disabled={busy} onClick={() => void save()}>{busy ? <Loader2 className="animate-spin" data-icon="inline-start" /> : <Plus data-icon="inline-start" />}{busy ? 'Creating…' : 'Create topic'}</Button>
    </div>
  </fieldset>;
}

export function CreateTopicDialog({ onCreated }: { onCreated: () => void | Promise<void> }) {
  return <DraftOwner>{owner => <OwnedTopicDialog owner={owner} onCreated={onCreated} />}</DraftOwner>;
}
function OwnedTopicDialog({ owner, onCreated }: { owner: string; onCreated: () => void | Promise<void> }) {
  const [open, setOpen] = useState(false);
  const [discard, setDiscard] = useState(false);
  const [state, setState] = useState({ dirty: false, busy: false });
  function changeOpen(next: boolean) {
    if (!next && state.busy) return;
    if (!next && state.dirty) { setDiscard(true); return; }
    setOpen(next);
  }
  return <Dialog open={open} onOpenChange={changeOpen}>
    <DialogTrigger asChild><Button data-create-topic-trigger><Plus data-icon="inline-start" />Add topic</Button></DialogTrigger>
    <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-lg" onCloseAutoFocus={event => {
      const trigger = document.querySelector<HTMLButtonElement>('[data-create-topic-trigger]');
      if (trigger) { event.preventDefault(); trigger.focus(); }
    }}>
      <DialogHeader><DialogTitle>Add topic</DialogTitle><DialogDescription>Drafts are retained in this tab when you navigate away. Organize your questions and track mastery. New topics start with zero questions.</DialogDescription></DialogHeader>
      {open && <TopicEditor owner={owner} onStateChange={setState} onCancel={() => changeOpen(false)} onCreated={() => {
        setOpen(false); setState({ dirty: false, busy: false });
        void Promise.resolve().then(onCreated).catch(() => toast.error('Topic saved. Refresh the page to update the list.'));
      }} />}
      <DiscardDraft open={discard} onOpenChange={setDiscard} onDiscard={() => { clearDraft(owner, 'topic'); setDiscard(false); setOpen(false); setState({ dirty: false, busy: false }); }} />
    </DialogContent>
  </Dialog>;
}
