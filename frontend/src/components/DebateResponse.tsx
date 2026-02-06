import { DebateResponse as DebateResponseType } from '@/types/debate';
import { DebateSection } from './DebateSection';

interface DebateResponseProps {
  response: DebateResponseType;
}

export function DebateResponseView({ response }: DebateResponseProps) {
  const sections = [
    { title: 'Position', content: response.position },
    { title: 'Core Reasoning', content: response.coreReasoning },
    { title: "Where You're Right", content: response.whereYoureRight },
    { title: "Where You're Weak", content: response.whereYoureWeak },
    { title: 'Stronger Version of Argument', content: response.strongerVersion },
  ];

  return (
    <div className="border border-border rounded-lg bg-card">
      <div className="px-6 py-4 border-b border-border">
        <h2 className="text-sm font-semibold text-foreground">Analysis</h2>
      </div>
      <div className="px-6">
        {sections.map((section) => (
          <DebateSection key={section.title} title={section.title} content={section.content} />
        ))}
      </div>
    </div>
  );
}
