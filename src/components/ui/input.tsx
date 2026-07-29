import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  onClear?: () => void;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      leftElement,
      rightElement,
      onClear,
      value,
      error,
      disabled,
      ...props
    },
    ref
  ) => {
    const hasValue = Boolean(value && String(value).length > 0);

    return (
      <div className="w-full space-y-1">
        <div className="relative flex items-center w-full">
          {leftElement && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-white/60">
              {leftElement}
            </div>
          )}

          <input
            type={type}
            value={value}
            disabled={disabled}
            className={cn(
              'w-full h-12 rounded-2xl bg-white/10 hover:bg-white/15 focus:bg-white/20 backdrop-blur-md border border-white/20 focus:border-white/40 px-4 text-sm text-white placeholder:text-white/50 transition-all duration-200 outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50 disabled:pointer-events-none',
              leftElement && 'pl-11',
              (rightElement || (onClear && hasValue)) && 'pr-11',
              error && 'border-red-400/60 focus:border-red-400 focus:ring-red-400/20',
              className
            )}
            ref={ref}
            {...props}
          />

          <div className="absolute right-3.5 flex items-center space-x-1">
            {onClear && hasValue && (
              <button
                type="button"
                onClick={onClear}
                className="p-1 rounded-full text-white/60 hover:text-white hover:bg-white/15 transition-colors focus:outline-none"
                aria-label="Clear input"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            {rightElement}
          </div>
        </div>

        {error && (
          <p className="text-xs text-red-300 font-medium px-1 animate-in fade-in-50">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';