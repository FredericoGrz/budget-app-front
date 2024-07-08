import { useEffect, useState } from "react";
import { CardMoney } from "../components/CardMoney";
import { Header } from "../components/Header";
import { CustomError } from "../types/errorTypes";
import { useToast } from "../components/ui/use-toast";
import { api } from "../services/api";
import { Table } from "../components/Table";
import { Tabs } from "../components/Tabs";
import { format } from "date-fns";
import { AddDialog } from "../components/AddDialog";

type datafechedProps = {
  id: number;
  user_id: number;
  description: string;
  created_at: string;
  updated_at: string;
  value: number | string;
};

function Dashboard() {
  const { toast } = useToast();
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  function onIncomeUpdated() {
    fetchIncomes();
  }
  function onExpenseUpdated() {
    fetchExpenses();
  }

  const incomeContent = () => (
    <Table data={incomes} onUpdate={onIncomeUpdated} type="income" />
  );
  const expenseContent = () => (
    <Table data={expenses} onUpdate={onExpenseUpdated} type="expense" />
  );

  function generateTabContents() {
    return [
      { value: "Expense", content: expenseContent() },
      { value: "Income", content: incomeContent() },
    ];
  }

  async function fetchIncomes() {
    try {
      const response = await api.get("incomes");

      response.data.map((income: datafechedProps) => {
        income.created_at = format(
          new Date(income.created_at),
          "MM/dd/yyyy hh:mm a"
        );
        income.value = `$ ${income.value}`;
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

        expense.value = `$ ${expense.value}`;
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

  function dialogUpdate(type: string) {
    if (type === "income") fetchIncomes();
    else fetchExpenses();
  }

  useEffect(() => {
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
        <div className="col-span-2 relative">
          <Tabs defaultValue="expense" contents={generateTabContents()} />
          <AddDialog
            className="absolute top-0 right-4 lg:hidden"
            onUpdate={dialogUpdate}
          />
        </div>
      )}
    </div>
  );
}
export default Dashboard;
