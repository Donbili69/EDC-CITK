import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from "react";

const fieldClasses =
  "w-full border border-line bg-paper px-3.5 py-2.5 text-small text-ink placeholder:text-ink-400 focus:border-ink";

interface FieldWrapperProps {
  label: string;
  id: string;
  required?: boolean;
}

function FieldLabel({ label, id, required }: FieldWrapperProps) {
  return (
    <label htmlFor={id} className="mb-1.5 block text-small font-medium text-ink-600">
      {label}
      {required && <span className="text-signal"> *</span>}
    </label>
  );
}

export function Input({
  label,
  id,
  required,
  ...props
}: FieldWrapperProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <FieldLabel label={label} id={id} required={required} />
      <input id={id} required={required} className={fieldClasses} {...props} />
    </div>
  );
}

export function Textarea({
  label,
  id,
  required,
  ...props
}: FieldWrapperProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <FieldLabel label={label} id={id} required={required} />
      <textarea id={id} required={required} rows={4} className={fieldClasses} {...props} />
    </div>
  );
}

export function Select({
  label,
  id,
  required,
  children,
  ...props
}: FieldWrapperProps & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <FieldLabel label={label} id={id} required={required} />
      <select id={id} required={required} className={fieldClasses} {...props}>
        {children}
      </select>
    </div>
  );
}
