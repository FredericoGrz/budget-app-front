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
  items: { value: string; label: string }[];
  onChange: (value: string) => void;
};

export function Select({ label, items, onChange }: SelectProps) {
  return (
    <SelectShad onValueChange={(value) => onChange(value)}>
      <SelectTrigger className=" border-zinc-700">
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
