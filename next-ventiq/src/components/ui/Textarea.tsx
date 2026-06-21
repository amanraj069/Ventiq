import { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  charCount?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, charCount, maxLength, className = '', id, value, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const currentLength = typeof value === 'string' ? value.length : 0;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium text-fg-secondary"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          value={value}
          maxLength={maxLength}
          className={`
            w-full min-h-[100px] px-3 py-2.5 text-sm text-fg
            bg-bg-elevated border rounded-[var(--radius-md)]
            placeholder:text-fg-faint resize-y
            transition-colors duration-[var(--duration-fast)]
            focus:outline-none focus:border-[var(--color-border-focus)] focus:ring-1 focus:ring-[var(--color-border-focus)]
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? 'border-danger focus:border-danger focus:ring-danger' : 'border-border hover:border-border-strong'}
            ${className}
          `.trim()}
          aria-invalid={!!error}
          aria-describedby={error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined}
          {...props}
        />
        <div className="flex items-center justify-between">
          <div>
            {error && (
              <p id={`${textareaId}-error`} className="text-xs text-danger" role="alert">
                {error}
              </p>
            )}
            {!error && hint && (
              <p id={`${textareaId}-hint`} className="text-xs text-fg-muted">
                {hint}
              </p>
            )}
          </div>
          {charCount && maxLength && (
            <span className="text-xs text-fg-faint font-tabular">
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
