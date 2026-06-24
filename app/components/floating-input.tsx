import { cn } from "@/lib/utils";
import { useState, type ReactNode } from "react";

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
  error?: string;
}

export function FloatingInput({ label, className, error, onBlur, onChange, value, defaultValue, ...props }: FloatingInputProps) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const currentValue = value ?? defaultValue;
  const shouldFloat = focused || hasValue || (currentValue !== undefined && `${currentValue}`.trim() !== "");

  return (
    <div className="relative">
      <input
        className={cn(
          "peer w-full rounded-lg border bg-transparent px-4 py-3 outline-none transition-colors ",
          error
            ? "border-red-500 focus:border-red-500"
            : "border-border focus:border-primary",
          className
        )}
        placeholder=" "
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          setHasValue(e.target.value !== "");
          onBlur?.(e);
        }}
        onChange={(e) => {
          setHasValue(e.target.value !== "");
          onChange?.(e);
        }}
        value={value}
        defaultValue={defaultValue}
        aria-invalid={error ? "true" : "false"}
        {...props}
      />
            {error && (
        <p className="mt-1 text-sm font-semibold font-mono text-red-500">
          {error}
        </p>
      )}
      <label
        className={cn(
          "absolute left-4 top-3 text-muted-foreground transition-all duration-200 pointer-events-none font-mono text-sm font-semibold",
          "peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-xs peer-focus:bg-background peer-focus:px-1",
          error ? "peer-focus:text-red-500" : "peer-focus:text-pink-700",
          shouldFloat && "-top-2.5 left-3 text-xs bg-background px-1"
        )}
      >
        {label}
      </label>

    </div>
  );
}
