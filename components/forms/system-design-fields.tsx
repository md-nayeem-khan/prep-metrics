"use client";

import { useId, useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

export function TextField({ name, label, value, onChange, error, onBlur, required, multiline, suggestions, help, placeholder, disabled }: {
  name: string; label: string; value: string; onChange: (value: string) => void; error?: string;
  onBlur?: () => void; required?: boolean; multiline?: boolean; suggestions?: string[]; help?: string; placeholder?: string; disabled?: boolean;
}) {
  const id = useId();
  const props = { id, name, value, disabled, placeholder, required, onBlur, 'aria-invalid': !!error,
    'aria-describedby': [help ? `${id}-help` : '', error ? `${id}-error` : ''].filter(Boolean).join(' ') || undefined,
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(event.target.value) };
  return <Field data-invalid={!!error}>
    <FieldLabel htmlFor={id}>{label}{required ? ' *' : ''}</FieldLabel>
    {multiline ? <Textarea {...props} rows={4} /> : <Input {...props} list={suggestions ? `${id}-options` : undefined} />}
    {suggestions && <datalist id={`${id}-options`}>{[...new Set(suggestions)].map(item => <option key={item} value={item} />)}</datalist>}
    {help && <FieldDescription id={`${id}-help`}>{help}</FieldDescription>}
    {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
  </Field>;
}

export function RelationshipField({ label, name, options, selected, onChange, disabled, error }: {
  label: string; name: string; options: { id: number; name: string }[]; selected: number[];
  onChange: (ids: number[]) => void; disabled?: boolean; error?: string;
}) {
  const [query, setQuery] = useState('');
  const id = useId();
  const available = new Set(options.map(option => option.id));
  const choices = [...options, ...selected.filter(value => !available.has(value)).map(value => ({ id: value, name: `Unavailable selection (${value}) — remove to continue` }))];
  const filtered = choices.filter(option => option.name.toLowerCase().includes(query.trim().toLowerCase()));
  return <FieldSet disabled={disabled} data-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined}>
    <FieldLegend>{label} <span className="text-muted-foreground">({selected.length} selected)</span></FieldLegend>
    <Input name={name} aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} aria-label={`Search ${label.toLowerCase()}`} placeholder={`Search ${label.toLowerCase()}…`} value={query} onChange={event => setQuery(event.target.value)} />
    <FieldGroup className="max-h-40 gap-2 overflow-y-auto rounded-md border p-3">
      {filtered.map(option => <Field key={option.id} orientation="horizontal">
        <Checkbox id={`${id}-${option.id}`} name={name} checked={selected.includes(option.id)} onCheckedChange={checked => onChange(checked ? [...selected, option.id] : selected.filter(value => value !== option.id))} />
        <FieldLabel htmlFor={`${id}-${option.id}`}>{option.name}</FieldLabel>
      </Field>)}
      {!filtered.length && <FieldDescription>{options.length ? 'No matches. Try a different search.' : `No ${label.toLowerCase()} yet.`}</FieldDescription>}
    </FieldGroup>
    {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
  </FieldSet>;
}

export function DiscardDraft({ open, onOpenChange, onDiscard }: { open: boolean; onOpenChange: (open: boolean) => void; onDiscard: () => void }) {
  return <AlertDialog open={open} onOpenChange={onOpenChange}>
    <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Discard this draft?</AlertDialogTitle>
      <AlertDialogDescription>Your unsaved changes will be lost.</AlertDialogDescription></AlertDialogHeader>
      <AlertDialogFooter><AlertDialogCancel>Keep editing</AlertDialogCancel><AlertDialogAction onClick={onDiscard}>Discard draft</AlertDialogAction></AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>;
}

export function useInvalidFocus(root: React.RefObject<HTMLElement | null>, busy: boolean) {
  const [pending, setPending] = useState<Record<string, string> | null>(null);
  useEffect(() => {
    if (!pending || busy) return;
    let attempts = 0;
    let frame = 0;
    const focus = () => {
      if (!root.current) return;
      const target = Array.from(root.current.querySelectorAll<HTMLElement>('[name]')).find(control => pending[control.getAttribute('name') ?? ''] && !control.matches(':disabled'));
      target?.focus();
      if (target && document.activeElement === target) { target.scrollIntoView({ block: 'nearest' }); setPending(null); }
      else if (++attempts < 30) frame = requestAnimationFrame(focus);
    };
    frame = requestAnimationFrame(focus);
    return () => cancelAnimationFrame(frame);
  }, [pending, busy, root]);
  return setPending;
}
