import { ButtonHTMLAttributes } from "react";

type ButtonProps = {
  title: string;
  variant: "dark" | "light" | "save" | "cancel" | "delete";
  isLoading?: boolean;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  title,
  variant,
  isLoading = false,
  className = "",
  ...rest
}: ButtonProps) {
  let cn = "";
  switch (variant) {
    case "dark":
      cn = "text-zinc-50 bg-zinc-800";
      break;
    case "light":
      cn = "text-zinc-800 bg-zinc-50 border-zinc-800";
      break;
    case "save":
      cn = "text-white bg-violet-500";
      break;
    case "cancel":
      cn = "text-white bg-violet-300 hover:bg-violet-400 transition-colors";
      break;
    case "delete":
      cn = "text-white bg-red-500 hover:bg-red-600 transition-colors";
      break;
  }

  cn += ` ${className}`;

  cn.includes("p-") ? null : (cn += " p-4");

  return (
    <button
      {...rest}
      className={`text-center rounded-3xl flex items-center justify-center gap-1 ${cn}`}
    >
      {isLoading && (
        <div
          className={`w-5 h-5 rounded-full border-2 animate-spin ${
            variant === "delete"
              ? "border-white border-t-zinc-200"
              : "border-zinc-400 border-t-zinc-50"
          }`}
        ></div>
      )}
      {title}
    </button>
  );
}
