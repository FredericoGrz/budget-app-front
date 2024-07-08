import { MdOutlineWarning } from "react-icons/md";
import { NumericFormat } from "react-number-format";

type DolarInputProps = {
  label: string;
  name?: string;
  error?: string;
  value: number;
  onValueChange: (value: number | undefined) => void;
};

export function DolarInput({
  label,
  name,
  error = "",
  value,
  onValueChange,
}: DolarInputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label
        htmlFor={label}
        className={`font-medium ${error && "text-red-600"}`}
      >
        {label}
      </label>
      <NumericFormat
        thousandSeparator={true}
        prefix={"$"}
        decimalScale={2}
        fixedDecimalScale={true}
        value={value}
        onValueChange={(value) => onValueChange(value.floatValue)}
        displayType={"input"}
        id={name}
        name={name}
        className={`w-full bg-transparent  text-zinc-600 placeholder:text-zinc-400 pl-0.5 outline-none ${
          error ? "border-b-2 border-red-600" : "border-b border-zinc-600"
        }`}
      />

      {/* Se houver algum erro, exibe a mensagem de erro */}
      <div className={error ? "flex gap-1 items-center" : "hidden"}>
        <MdOutlineWarning className="text-red-600" />
        <p className={`text-xs font-medium text-red-600 $`}>{error}</p>
      </div>
    </div>
  );
}
