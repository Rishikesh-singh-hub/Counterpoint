interface DebateSectionProps {
  title: string;
  content: string;
}

export function DebateSection({ title, content }: DebateSectionProps) {
  return (
    <div className="py-5 border-b border-border last:border-b-0">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-foreground">{content}</p>
    </div>
  );
}
