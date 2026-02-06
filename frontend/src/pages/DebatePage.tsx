import { useApp } from '@/app/providers/AppProvider';
import { DebateLayout } from '@/layouts/DebateLayout';
import { ExpandingInput } from '@/components/ExpandingInput';
import { DebateResponseView } from '@/components/DebateResponse';

export default function DebatePage() {
  const { selectedPersona, currentResponse, isLoading, submitArgument } = useApp();

  return (
    <DebateLayout>
      <div className="max-w-2xl mx-auto px-6 py-10">
        <header className="mb-10">
          <h1 className="text-xl font-semibold text-foreground tracking-tight">Counterpoint</h1>
          {selectedPersona ? (
            <p className="text-sm text-muted-foreground mt-1">
              Debating as:{' '}
              <span className="text-foreground font-medium">{selectedPersona.name}</span>
            </p>
          ) : (
            <p className="text-sm text-muted-foreground mt-1">
              Select a persona from the sidebar to begin.
            </p>
          )}
        </header>

        {selectedPersona && (
          <div className="mb-8">
            <ExpandingInput onSubmit={submitArgument} disabled={isLoading} />
          </div>
        )}

        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground py-8">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-pulse" />
            <span>Analyzing your argument...</span>
          </div>
        )}

        {currentResponse && !isLoading && <DebateResponseView response={currentResponse} />}

        {!selectedPersona && !currentResponse && (
          <div className="py-16 text-center">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Choose a perspective. Present your argument. Receive structured analysis.
            </p>
          </div>
        )}
      </div>
    </DebateLayout>
  );
}
