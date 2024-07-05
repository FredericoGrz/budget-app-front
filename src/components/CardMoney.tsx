import { useEffect, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { CustomError } from "../types/errorTypes";
import { useToast } from "./ui/use-toast";
import { api } from "../services/api";

type CardMoneyProps = {
  type: "spent" | "budget";
  className?: string;
};

export function CardMoney({ type, className = "" }: CardMoneyProps) {
  const { toast } = useToast();
  const [totalBudget, setTotalBudget] = useState(0);
  const [expenses, setExpenses] = useState(0);

  useEffect(() => {
    async function getBudgetInfo() {
      try {
        const response = await api.get("budget");
        const { totalBudget, expenses } = response.data;

        setTotalBudget(totalBudget);
        setExpenses(expenses);
      } catch (error) {
        console.log(error);
        const typedError = error as CustomError;
        const errorMessage = typedError.response?.data?.message;

        toast({
          title: "Error",
          description: errorMessage,
          variant: "error",
        });
      }
    }

    getBudgetInfo();
  }, []);
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
          ${type === "spent" ? expenses.toFixed(2) : totalBudget.toFixed(2)}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
