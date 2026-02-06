import { Persona } from '@/types/persona';

interface PersonaCardProps {
  persona: Persona;
  isActive: boolean;
  collapsed: boolean;
  onSelect: () => void;
}

export function PersonaCard({ persona, isActive, collapsed, onSelect }: PersonaCardProps) {
  const initials = persona.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2);

  return (
    <button
      onClick={onSelect}
      className={`
        w-full text-left rounded-md transition-colors duration-150
        ${collapsed ? 'p-2 flex items-center justify-center' : 'p-3'}
        ${
          isActive
            ? 'bg-primary text-primary-foreground'
            : 'hover:bg-secondary text-foreground'
        }
      `}
      title={persona.name}
    >
      {collapsed ? (
        <span className="text-xs font-semibold">{initials}</span>
      ) : (
        <div>
          <div className="text-sm font-medium">{persona.name}</div>
          <div
            className={`text-xs mt-0.5 leading-relaxed ${
              isActive ? 'text-primary-foreground/70' : 'text-muted-foreground'
            }`}
          >
            {persona.description}
          </div>
        </div>
      )}
    </button>
  );
}
