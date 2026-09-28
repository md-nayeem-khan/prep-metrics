"use client";

import { DraftOwner, useRetainedDraft, clearDraft } from './retained-draft';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronDown, Loader2, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CreateValidationError, QUESTION_CATEGORIES, questionSlug, validateCreate, type FieldErrors } from '@/lib/system-design-create';
import { DiscardDraft, useInvalidFocus, RelationshipField, TextField } from './system-design-fields';
import { TopicEditor, type CreatedTopic } from './create-topic-dialog';

const initialDraft = {
  title: '', slug: '', prompt: '', difficulty: 'medium', category: '', source: 'Company', url: '', notes: '',
  functionalRequirements: '', nonFunctionalRequirements: '', estimationNotes: '', referenceSolution: '', commonPitfalls: '',
  topicIds: [] as number[], companyIds: [] as number[],
};
const sections: { title: string; fields: readonly (readonly [keyof typeof initialDraft, string])[] }[] = [
  { title: 'Requirements', fields: [['functionalRequirements', 'Functional requirements'], ['nonFunctionalRequirements', 'Non-functional requirements'], ['estimationNotes', 'Estimation notes']] },
  { title: 'Reference material', fields: [['referenceSolution', 'Reference solution'], ['commonPitfalls', 'Common pitfalls']] },
  { title: 'Additional details', fields: [['url', 'Source URL'], ['notes', 'Notes'], ['slug', 'Slug']] },
] as const;
type Options = { topics: CreatedTopic[]; companies: { id: number; name: string }[]; categories: string[] };

export function CreateQuestionSheet({ onCreated }: { onCreated: () => void | Promise<void> }) {
  const [open, setOpen] = useState(false);
  const requestClose = useRef<() => void>(() => setOpen(false));
  return <Sheet open={open} onOpenChange={next => { if (next) { requestClose.current = () => setOpen(false); setOpen(true); } else requestClose.current(); }}>
    <SheetTrigger asChild><Button data-create-question-trigger><Plus data-icon="inline-start" />Add question</Button></SheetTrigger>
    <SheetContent className="w-full gap-0 p-0 sm:max-w-2xl" showCloseButton={false} onCloseAutoFocus={event => {
      const trigger = document.querySelector<HTMLButtonElement>('[data-create-question-trigger]');
      if (trigger) { event.preventDefault(); trigger.focus(); }
    }}>
      <SheetHeader className="shrink-0 border-b px-6 py-5"><SheetTitle>Add question</SheetTitle><SheetDescription>Drafts are retained in this tab when you navigate away. Build your practice bank. Start with the essentials; add reference material when ready.</SheetDescription></SheetHeader>
      {open && <DraftOwner>{owner => <QuestionEditor owner={owner} onClose={() => setOpen(false)} requestClose={requestClose} onCreated={onCreated} />}</DraftOwner>}
    </SheetContent>
  </Sheet>;
}

function QuestionEditor({ owner, onClose, onCreated, requestClose }: {
  owner: string; onClose: () => void; onCreated: () => void | Promise<void>; requestClose: React.MutableRefObject<() => void>;
}) {
  const router = useRouter();
  const id = useId();
  const [draft, setDraft, clearQuestion] = useRetainedDraft(owner, 'question', initialDraft);
  const [slugEdited, setSlugEdited] = useRetainedDraft(owner, 'slug-edited', false);
  const [fields, setFields] = useState<FieldErrors>({});
  const [error, setError] = useState('');
  const [existingId, setExistingId] = useState<number>();
  const [busy, setBusy] = useState(false);
  const lock = useRef(false);
  const root = useRef<HTMLFormElement>(null);
  const focusInvalid = useInvalidFocus(root, busy);
  const [expanded, setExpanded] = useState<string[]>([]);
  const [options, setOptions] = useState<Options>({ topics: [], companies: [], categories: [] });
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [optionsError, setOptionsError] = useState('');
  const [inlineTopic, setInlineTopic] = useRetainedDraft(owner, 'inline-open', false);
  const [topicState, setTopicState] = useState({ dirty: false, busy: false });
  const [discard, setDiscard] = useState<'all' | 'topic' | null>(null);
  const dirty = JSON.stringify(draft) !== JSON.stringify(initialDraft) || topicState.dirty;

  const loadOptions = useCallback(async (signal?: AbortSignal) => {
    setOptionsLoading(true); setOptionsError('');
    try {
      const response = await fetch('/api/system-design/filters', { signal });
      if (!response.ok) throw new Error();
      const data = await response.json();
      if (!signal?.aborted) setOptions(data);
    } catch { if (!signal?.aborted) setOptionsError('Could not load topics and companies. Retry to select relationships.'); }
    finally { if (!signal?.aborted) setOptionsLoading(false); }
  }, []);
  useEffect(() => { const controller = new AbortController(); void loadOptions(controller.signal); return () => controller.abort(); }, [loadOptions]);
  useEffect(() => {
    requestClose.current = () => { if (lock.current || topicState.busy) return; if (dirty) setDiscard('all'); else onClose(); };
  }, [dirty, topicState.busy, onClose, requestClose]);
  useEffect(() => {
    if (!dirty) return;
    const handler = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ''; };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [dirty]);

  function update(key: keyof typeof initialDraft, value: string | number[]) {
    setDraft(previous => ({ ...previous, [key]: value, ...(key === 'title' && !slugEdited ? { slug: questionSlug(value as string) } : {}) }));
    if (key === 'slug') setSlugEdited(true);
    setExistingId(undefined);
  }
  function showErrors(next: FieldErrors) {
    setFields(next);
    setExpanded(previous => [...new Set([...previous, ...sections.filter(section => section.fields.some(([key]) => next[key])).map(section => section.title)])]);
    focusInvalid(next);
  }
  function blur(key: string) {
    try { validateCreate('question', draft); setFields(previous => ({ ...previous, [key]: '' })); }
    catch (error) { if (error instanceof CreateValidationError) setFields(previous => ({ ...previous, [key]: error.fields[key] ?? '' })); }
  }
  async function save(event: React.FormEvent) {
    event.preventDefault();
    if (lock.current || topicState.busy || inlineTopic) return;
    setError(''); setExistingId(undefined);
    try { validateCreate('question', draft); }
    catch (error) { if (error instanceof CreateValidationError) showErrors(error.fields); return; }
    lock.current = true; setBusy(true); setFields({});
    try {
      const response = await fetch('/api/system-design', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(draft) });
      const result = await response.json();
      if (!response.ok) { showErrors(result.fields ?? {}); setError(result.error ?? 'Unable to create question.'); setExistingId(result.existingId); return; }
      clearQuestion(); clearDraft(owner, 'slug-edited'); clearDraft(owner, 'inline-open');
      onClose();
      toast.success('Question created', { action: { label: 'View question', onClick: () => router.push(`/system-design/${result.question.id}`) }, duration: 10000 });
      void Promise.resolve().then(onCreated).catch(() => toast.error('Question saved. Refresh the page to update the list.'));
    } catch { setError('Unable to confirm the save. Your draft is preserved. Retry with the same slug to avoid creating a duplicate.'); }
    finally { lock.current = false; setBusy(false); }
  }
  const textField = (key: keyof typeof initialDraft, label: string, required = false, multiline = true) => <TextField key={key} name={key} label={label} value={draft[key] as string} onChange={value => update(key, value)} onBlur={() => blur(key)} error={fields[key]} required={required} multiline={multiline} disabled={busy} />;
  return <>
    <form ref={root} onSubmit={save} noValidate aria-busy={busy} className="flex min-h-0 flex-1 flex-col">
      <div className="flex min-h-0 flex-1 flex-col gap-7 overflow-y-auto px-6 py-6">
        <FieldGroup>
          {textField('title', 'Title', true, false)}
          {textField('prompt', 'Prompt', true)}
          <Field data-invalid={!!fields.difficulty}><FieldLabel id={`${id}-difficulty`}>Difficulty *</FieldLabel>
            <ToggleGroup type="single" variant="outline" value={draft.difficulty} disabled={busy} aria-labelledby={`${id}-difficulty`} onValueChange={value => { if (value) update('difficulty', value); }}>
              <ToggleGroupItem value="easy">Easy</ToggleGroupItem><ToggleGroupItem value="medium">Medium</ToggleGroupItem><ToggleGroupItem value="hard">Hard</ToggleGroupItem>
            </ToggleGroup>{fields.difficulty && <FieldError>{fields.difficulty}</FieldError>}
          </Field>
          <TextField name="category" label="Category" required value={draft.category} suggestions={[...QUESTION_CATEGORIES, ...options.categories]} placeholder="Choose or enter a category" onChange={value => update('category', value)} onBlur={() => blur('category')} error={fields.category} disabled={busy} />
        </FieldGroup>
        <FieldGroup>
          {optionsLoading && <FieldDescription role="status">Loading topics and companies…</FieldDescription>}
          {optionsError && <Alert role="alert"><AlertDescription>{optionsError}</AlertDescription></Alert>}
          <RelationshipField label="Topics" name="topicIds" options={options.topics} selected={draft.topicIds} onChange={value => update('topicIds', value)} disabled={busy || optionsLoading} error={fields.topicIds} />
          {inlineTopic ? <div className="rounded-lg border p-4"><TopicEditor owner={owner} inline onStateChange={setTopicState} onCancel={() => topicState.dirty ? setDiscard('topic') : setInlineTopic(false)} onCreated={topic => {
            setOptions(previous => ({ ...previous, topics: [...previous.topics.filter(item => item.id !== topic.id), topic].sort((a, b) => a.name.localeCompare(b.name)) }));
            setDraft(previous => ({ ...previous, topicIds: [...new Set([...previous.topicIds, topic.id])] }));
            setInlineTopic(false); setTopicState({ dirty: false, busy: false });
          }} /></div> : <Button type="button" variant="outline" className="self-start" disabled={busy || optionsLoading} onClick={() => setInlineTopic(true)}><Plus data-icon="inline-start" />Create a topic</Button>}
          <RelationshipField label="Companies" name="companyIds" options={options.companies} selected={draft.companyIds} onChange={value => update('companyIds', value)} disabled={busy || optionsLoading} error={fields.companyIds} />
          <Button type="button" variant="ghost" className="self-start" disabled={busy || optionsLoading || inlineTopic} onClick={() => void loadOptions()}>Reload options</Button>
        </FieldGroup>
        {sections.map(section => <Collapsible key={section.title} open={expanded.includes(section.title)} onOpenChange={next => setExpanded(previous => next ? [...previous, section.title] : previous.filter(value => value !== section.title))}>
          <CollapsibleTrigger asChild><Button type="button" variant="outline" className="w-full justify-between">{section.title}<ChevronDown data-icon="inline-end" /></Button></CollapsibleTrigger>
          <CollapsibleContent className="pt-5"><FieldGroup>
            {section.title === 'Additional details' && <Field><FieldLabel id={`${id}-source`}>Source</FieldLabel><ToggleGroup type="single" variant="outline" value={draft.source} disabled={busy} aria-labelledby={`${id}-source`} onValueChange={value => { if (value) update('source', value); }}><ToggleGroupItem value="Company">Company</ToggleGroupItem><ToggleGroupItem value="Curated">Curated</ToggleGroupItem><ToggleGroupItem value="HelloInterview">Hello Interview</ToggleGroupItem></ToggleGroup></Field>}
            {section.fields.map(([key, label]) => textField(key, label, key === 'slug', !['url', 'slug'].includes(key)))}
            {section.title === 'Additional details' && <FieldDescription>The slug is generated from your title and must be unique in your question bank.</FieldDescription>}
          </FieldGroup></CollapsibleContent>
        </Collapsible>)}
      </div>
      <div className="flex shrink-0 flex-col gap-3 border-t px-6 py-4">
        {(error || fields._form) && <Alert variant="destructive" role="alert"><AlertDescription>{error || fields._form}{existingId && <Link className="underline" href={`/system-design/${existingId}`}>View existing question</Link>}</AlertDescription></Alert>}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-muted-foreground text-xs">{inlineTopic ? 'Save or cancel the topic before creating your question.' : '* Required fields'}</p>
          <div className="flex gap-2"><Button type="button" variant="outline" disabled={busy || topicState.busy} onClick={() => requestClose.current()}>Cancel</Button>
            <Button type="submit" disabled={busy || inlineTopic}>{busy && <Loader2 className="animate-spin" data-icon="inline-start" />}{busy ? 'Creating…' : 'Create question'}</Button></div>
        </div>
      </div>
    </form>
    <DiscardDraft open={!!discard} onOpenChange={next => { if (!next) setDiscard(null); }} onDiscard={() => {
      if (discard === 'all') { clearQuestion(); clearDraft(owner, 'slug-edited'); clearDraft(owner, 'inline-open'); clearDraft(owner, 'inline-topic'); onClose(); }
      else { clearDraft(owner, 'inline-topic'); setInlineTopic(false); setTopicState({ dirty: false, busy: false }); }
      setDiscard(null);
    }} />
  </>;
}
