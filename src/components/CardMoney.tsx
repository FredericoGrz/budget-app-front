import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

type CardMoneyProps = {
  type: "spent" | "budget";
  className?: string;
  value: number;
};

export function CardMoney({ value, type, className = "" }: CardMoneyProps) {
  return (
    <Card className={`shadow-lg ${className}`}>
      <CardHeader className="text-center flex flex-col gap-3">
        <CardTitle
          className={`text-${
            type === "spent" ? "yellow" : "green"
          }-700 text-lg`}
        >
          {type === "spent" ? "Spent" : "Budget Available"}
        </CardTitle>
        <CardDescription
          className={`text-${
            type === "spent" ? "yellow" : "green"
          }-700 text-xl font-medium`}
        >
          $ {value.toFixed(2)}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
