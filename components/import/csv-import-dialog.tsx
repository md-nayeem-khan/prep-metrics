"use client";

import { useId, useRef, useState } from 'react';
import { Download, LoaderCircle, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { definition, MAX_FILE_BYTES, type ImportEntity, type ImportIssue, type ImportPreview } from '@/lib/import/definitions';

export function CsvImportDialog({ entity, onImported }: { entity: ImportEntity; onImported: () => void | Promise<unknown> }) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<ImportPreview | null>(null);
  const [issues, setIssues] = useState<ImportIssue[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [busy, setBusy] = useState<'preview' | 'commit' | null>(null);
  const [issueOffset, setIssueOffset] = useState(0);
  const [noticeOffset, setNoticeOffset] = useState(0);
  const [offset, setOffset] = useState(0);
  const requestId = useRef<string | null>(null);
  const inFlight = useRef(false);
  const def = definition(entity);

  const submit = async (action: 'preview' | 'commit') => {
    if (!file || inFlight.current) return;
    inFlight.current = true;
    setIssueOffset(0); setNoticeOffset(0); setBusy(action); setError(null); setIssues([]); setResult(null);
    if (action === 'preview') { setPreview(null); setOffset(0); requestId.current = null; }
    try {
      const form = new FormData();
      form.set('file', file);
      if (action === 'commit') {
        if (!preview?.token) throw new Error('Validate the file first.');
        requestId.current ??= crypto.randomUUID();
        form.set('token', preview.token);
        form.set('requestId', requestId.current);
      }
      const response = await fetch(`/api/import/${entity}/${action}`, { method: 'POST', body: form });
      const body = await response.json();
      if (action === 'preview' && body.rows) setPreview(body);
      if (!response.ok) {
        setIssues(body.issues ?? []);
        if (response.status === 409) setPreview(null);
        throw new Error(body.error ?? 'Fix the errors below and validate the file again.');
      }
      if (action === 'commit') {
        const message = `${body.created} created; ${body.skipped} skipped.`;
        setResult(message); setPreview(null); requestId.current = null;
        toast.success(message);
        try { await onImported(); }
        catch { toast.error('Import succeeded, but the list could not refresh. Reload the page.'); }
      }
    } catch (e) { setError(e instanceof Error ? e.message : 'Unable to reach the server. Retry to recover the import result.'); }
    finally { inFlight.current = false; setBusy(null); }
  };

  return (
    <Dialog open={open} onOpenChange={value => { if (!inFlight.current) setOpen(value); }}>
      <DialogTrigger asChild><Button variant="outline"><Upload data-icon="inline-start" />Import CSV</Button></DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Import {def.label}</DialogTitle>
          <DialogDescription>Validate and review before saving. Identical records are skipped; conflicts and invalid rows block the entire import.</DialogDescription>
        </DialogHeader>
        <Button variant="outline" asChild><a href={`/api/import/${entity}/template`} download><Download data-icon="inline-start" />Download template</a></Button>
        <details>
          <summary className="cursor-pointer">CSV format and field requirements</summary>
          <div className="flex flex-col gap-2 pt-2">
            <p>UTF-8 CSV, up to 2 MiB and 1,000 data rows. Use exact names for existing related records; import catalogs first. Lists use JSON arrays, for example [&quot;Storage&quot;]. Optional columns may be omitted; blank cells use the documented default or an empty value. Recognized enum casing is normalized and reported in the preview.</p>
            {entity === 'goals' && <p>Use one row per milestone. Repeat all goal fields with the same goalKey. Dates use YYYY-MM-DD; milestone dates must fall within the goal dates. New goals start active with no completed milestones.</p>}
            {entity === 'problems' && <p>Legacy problem-export headers and semicolon-separated tags/patterns are also accepted. Activity history is not imported.</p>}
            <Table><TableHeader><TableRow><TableHead>Column</TableHead><TableHead>Requirement</TableHead></TableRow></TableHeader>
              <TableBody>{Object.entries(def.fields).map(([name, field]) => <TableRow key={name}><TableCell>{name}</TableCell><TableCell>{field.required ? 'Required' : 'Optional'} · {field.values?.join(' / ') ?? field.kind ?? 'text'}{field.default !== undefined ? ` · default: ${field.default}` : ''}{field.maxBytes ? ` · ${field.kind === 'list' ? 'each item: ' : ''}max ${field.maxBytes} UTF-8 bytes` : ''}{field.kind === 'integer' ? ` · ${field.min ?? 0}–${field.max ?? 2147483647}` : ''}</TableCell></TableRow>)}</TableBody>
            </Table>
          </div>
        </details>
        <FieldGroup><Field data-invalid={!!error} data-disabled={!!busy}>
          <FieldLabel htmlFor={id}>CSV file</FieldLabel>
          <Input id={id} type="file" accept=".csv,text/csv" disabled={!!busy} aria-invalid={!!error} aria-describedby={`${id}-help`} onChange={event => {
            const next = event.target.files?.[0] ?? null;
            setFile(next); setPreview(null); setIssues([]); setResult(null); setOffset(0); requestId.current = null;
            setError(next && next.size > MAX_FILE_BYTES ? 'Files must be 2 MiB or smaller.' : null);
          }} />
          <FieldDescription id={`${id}-help`}>{file && <>Selected: {file.name} ({file.size.toLocaleString()} bytes). Choose another file to replace it. </>}Template includes an example record. Replace it with your data before importing.</FieldDescription>
        </Field></FieldGroup>
        <div aria-live="polite" className="flex flex-col gap-3">
          {error && <Alert variant="destructive"><AlertTitle>Import needs attention</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
          {!!issues.length && <div className="max-h-60 overflow-auto"><Table><TableHeader><TableRow><TableHead>CSV row</TableHead><TableHead>Column</TableHead><TableHead>Error</TableHead></TableRow></TableHeader><TableBody>{issues.slice(issueOffset, issueOffset + 20).map((item, index) => <TableRow key={index}><TableCell>{item.row}</TableCell><TableCell className="whitespace-normal">{item.column}</TableCell><TableCell className="whitespace-normal">{item.message}</TableCell></TableRow>)}</TableBody></Table></div>}
          {!!issues.length && <DiagnosticPages offset={issueOffset} setOffset={setIssueOffset} length={issues.length} total={preview?.issueCount ?? issues.length} label="errors" />}
          {result && <Alert><AlertTitle>Import complete</AlertTitle><AlertDescription>{result}</AlertDescription></Alert>}
          {preview && <>
            {!!preview.warnings.length && <details><summary className="cursor-pointer">{preview.warningCount ?? preview.warnings.length} import notices</summary><div className="flex max-h-40 flex-col gap-2 overflow-auto pt-2">{preview.warnings.slice(noticeOffset, noticeOffset + 20).map((warning, index) => <Alert key={index}><AlertDescription>Row {warning.row}, {warning.column}: {warning.message}</AlertDescription></Alert>)}</div><DiagnosticPages offset={noticeOffset} setOffset={setNoticeOffset} length={preview.warnings.length} total={preview.warningCount ?? preview.warnings.length} label="notices" /></details>}
            <p>{preview.totals.create} new records; {preview.totals.skipped} identical records to skip.</p>
            <Table><TableHeader><TableRow><TableHead>CSV row</TableHead><TableHead>Record</TableHead><TableHead>Action</TableHead><TableHead>Normalized values</TableHead></TableRow></TableHeader><TableBody>
              {preview.rows.slice(offset, offset + 20).map((row, index) => <TableRow key={index}><TableCell>{row.row}</TableCell><TableCell className="max-w-48 whitespace-normal break-words">{row.label}</TableCell><TableCell>{row.action}</TableCell><TableCell><details><summary className="cursor-pointer">View values</summary><pre className="max-w-sm whitespace-pre-wrap break-words">{JSON.stringify(row.data, null, 2)}</pre></details></TableCell></TableRow>)}
            </TableBody></Table>
            {preview.rows.length > 20 && <div className="flex items-center justify-end gap-2"><Button variant="outline" disabled={offset === 0} onClick={() => setOffset(n => n - 20)}>Previous</Button><span>{offset + 1}–{Math.min(offset + 20, preview.rows.length)} of {preview.rows.length}</span><Button variant="outline" disabled={offset + 20 >= preview.rows.length} onClick={() => setOffset(n => n + 20)}>Next</Button></div>}
          </>}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={!!busy}>Close</Button>
          <Button variant="outline" disabled={!file || file.size > MAX_FILE_BYTES || !!busy} onClick={() => submit('preview')}>{busy === 'preview' && <LoaderCircle className="animate-spin" data-icon="inline-start" />}Validate file</Button>
          <Button disabled={!preview?.token || !!preview.issues.length || !!busy} onClick={() => submit('commit')}>{busy === 'commit' && <LoaderCircle className="animate-spin" data-icon="inline-start" />}Confirm import</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DiagnosticPages({ offset, setOffset, length, total, label }: { offset: number; setOffset: (value: number) => void; length: number; total: number; label: string }) {
  return <div className="flex flex-wrap items-center justify-end gap-2">
    <span>{offset + 1}–{Math.min(offset + 20, length)} of {total} {label}{total > length ? ` (first ${length} available; fix these and validate again)` : ''}</span>
    {length > 20 && <><Button variant="outline" aria-label={`Previous ${label}`} disabled={!offset} onClick={() => setOffset(offset - 20)}>Previous</Button><Button variant="outline" aria-label={`Next ${label}`} disabled={offset + 20 >= length} onClick={() => setOffset(offset + 20)}>Next</Button></>}
  </div>;
}
