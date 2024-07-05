import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useToast } from "./ui/use-toast";
import { CustomError } from "../types/errorTypes";

export function StatusBudgetHeader({ className = "" }: { className?: string }) {
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
    <div className={className}>
      <div className="flex flex-col gap-1 text-green-700 hover:scale-110 transition-transform">
        <p className="text-lg">Budget Available</p>
        <p className="text-xl font-medium">${totalBudget.toFixed(2)}</p>
      </div>
      <div className="flex flex-col gap-1 text-yellow-700 hover:scale-110 transition-transform">
        <p className="text-lg">Spent</p>
        <p className="text-xl font-medium">${expenses.toFixed(2)}</p>
      </div>
    </div>
  );
}
