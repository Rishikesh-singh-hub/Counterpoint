import { useState, useRef, useCallback, KeyboardEvent, ChangeEvent } from 'react';

interface ExpandingInputProps {
  onSubmit: (value: string) => void;
  disabled?: boolean;
}

export function ExpandingInput({ onSubmit, disabled }: ExpandingInputProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 240)}px`;
  }, []);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    adjustHeight();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSubmit(trimmed);
    setValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  return (
    <div className="border border-border rounded-lg bg-card focus-within:border-primary/50 transition-colors">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="State your position..."
        disabled={disabled}
        rows={1}
        className="w-full resize-none bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50"
      />
      <div className="flex items-center justify-between px-4 pb-3">
        <span className="text-xs text-muted-foreground">Shift + Enter for new line</span>
        <button
          onClick={handleSubmit}
          disabled={disabled || !value.trim()}
          className="px-4 py-1.5 text-xs font-medium rounded bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-40 transition-opacity"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
