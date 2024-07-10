import { InputHTMLAttributes, forwardRef } from "react";
import { MdOutlineWarning } from "react-icons/md";

type InputProps = {
  label: string;
  name?: string;
  error?: string;
  variant?: "default" | "dark";
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, name, error = "", variant = "default", ...rest }, ref) => {
    const baseClasses = "w-full bg-transparent pl-0.5 outline-none border-b";
    const textClasses =
      variant === "default"
        ? "text-violet-500 placeholder:text-violet-400"
        : "text-zinc-600 placeholder:text-zinc-400";
    const borderClasses = error
      ? "border-red-600"
      : variant === "default"
      ? "border-violet-600"
      : "border-zinc-600";

    return (
      <div className="flex flex-col gap-1 w-full">
        <label
          htmlFor={label}
          className={`font-medium ${
            variant === "default" ? "text-violet-700" : "text-zinc-700"
          } ${error && "text-red-600"}`}
        >
          {label}
        </label>
        <input
          ref={ref}
          id={name}
          name={name}
          className={`${baseClasses} ${textClasses} ${borderClasses}`}
          {...rest}
        />
        {/* Se houver algum erro, exibe a mensagem de erro */}
        <div className={error ? "flex gap-1 items-center" : "hidden"}>
          <MdOutlineWarning className="text-red-600" />
          <p className={`text-xs font-medium text-red-600`}>{error}</p>
        </div>
      </div>
    );
  }
);
