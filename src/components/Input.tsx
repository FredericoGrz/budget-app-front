import { InputHTMLAttributes } from "react";

type InputProps = {
  label: string;
  name?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function Input({ label, name, ...rest }: InputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={label} className="font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        className="w-full bg-transparent border-b border-zinc-600 text-zinc-600 placeholder:text-zinc-400 pl-0.5 outline-none"
        {...rest}
      />
    </div>
  );
}
