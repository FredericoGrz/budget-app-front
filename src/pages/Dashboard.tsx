import { useEffect, useState } from "react";
import { CardMoney } from "../components/CardMoney";
import { Header } from "../components/Header";
import { CustomError } from "../types/errorTypes";
import { useToast } from "../components/ui/use-toast";
import { api } from "../services/api";
import { Table } from "../components/Table";
import { Tabs } from "../components/Tabs";
import { format } from "date-fns";

type datafechedProps = {
  id: number;
  user_id: number;
  description: string;
  created_at: string;
  updated_at: string;
  value: number;
};

function Dashboard() {
  const { toast } = useToast();
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const incomeContent = () => <Table data={incomes} type="income" />;
  const expenseContent = () => <Table data={expenses} type="expense" />;

  function generateTabContents() {
    return [
      { value: "Income", content: incomeContent() },
      { value: "Expense", content: expenseContent() },
    ];
  }

  useEffect(() => {
    async function fetchIncomes() {
      try {
        const response = await api.get("incomes");

        response.data.map((income: datafechedProps) => {
          income.created_at = format(
            new Date(income.created_at),
            "MM/dd/yyyy hh:mm a"
          );
        });

        setIncomes(response.data);
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

    async function fetchExpenses() {
      try {
        const response = await api.get("expenses");

        response.data.map((expense: datafechedProps) => {
          expense.created_at = format(
            new Date(expense.created_at),
            "MM/dd/yyyy hh:mm a"
          );
        });

        setExpenses(response.data);
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

    fetchIncomes();
    fetchExpenses();
  }, []);
  return (
    <div className="min-h-screen w-full bg-zinc-50 flex flex-col">
      <Header />
      <div className="grid grid-cols-2 gap-2 p-4 lg:hidden">
        <CardMoney type="budget" className="col-span-1 h-32" />
        <CardMoney type="spent" className="col-span-1 h-32" />
      </div>

      {incomes.length > 0 && (
        <div className="col-span-2">
          <Tabs defaultValue="income" contents={generateTabContents()} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
