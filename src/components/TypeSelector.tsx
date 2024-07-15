import { MdOutlineWarning } from "react-icons/md";

type TypeSelectorProps = {
  type: "expenses" | "incomes" | "";
  setType: (value: "expenses" | "incomes") => void;
  className?: string;
  error?: string;
};

export function TypeSelector({
  type,
  setType,
  className = "",
  error = "",
}: TypeSelectorProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label
        className={`font-medium ${error ? "text-red-600" : "text-violet-800"}`}
      >
        Type
      </label>
      <div className="flex items-center w-full">
        <button
          type="button"
          onClick={() => setType("expenses")}
          className={`w-1/2 p-4 rounded-l-xl ${
            error
              ? "bg-violet-50 text-red-600 border border-red-600 border-r-transparent"
              : type === "expenses"
              ? "bg-violet-300 text-violet-800 font-medium shadow-lg"
              : "bg-violet-100 text-violet-600"
          } `}
        >
          Expense
        </button>
        <button
          type="button"
          onClick={() => setType("incomes")}
          className={`w-1/2 p-4 rounded-r-xl ${
            error
              ? "bg-violet-50 text-red-600 border border-red-600 border-l-transparent"
              : type === "incomes"
              ? "bg-violet-300 text-violet-800 font-medium shadow-lg"
              : "bg-violet-100 text-violet-600"
          } `}
        >
          Income
        </button>
      </div>
      <div className={error ? "flex gap-1 items-center" : "hidden"}>
        <MdOutlineWarning className="text-red-600" />
        <p className={`text-xs font-medium text-red-600`}>{error}</p>
      </div>
    </div>
  );
}
