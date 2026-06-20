// Small labelled block for rendering optional rich-text content (markdown-ish).
// Returns null when there is no body, so callers can list many sections cheaply.
export function Section({ title, body }: { title: string; body: string | null | undefined }) {
  if (!body) return null;
  return (
    <div className="space-y-1">
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="text-muted-foreground whitespace-pre-wrap text-sm">{body}</p>
    </div>
  );
}
