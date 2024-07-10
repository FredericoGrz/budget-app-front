import {
  Select as SelectShad,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type SelectProps = {
  label: string;
  value?: string;
  items: { value: string; label: string }[];
  onChange: (value: "expenses" | "incomes") => void;
  className?: string;
};

export function Select({
  label,
  items,
  value,
  className,
  onChange,
}: SelectProps) {
  return (
    <SelectShad
      value={value}
      onValueChange={(value: "expenses" | "incomes") => onChange(value)}
    >
      <SelectTrigger
        className={`border-violet-700 text-violet-700 ${className}`}
      >
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {items.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectShad>
  );
}
