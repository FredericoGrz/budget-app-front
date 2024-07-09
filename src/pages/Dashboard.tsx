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
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { useMediaQuery } from "react-responsive";
import { DolarInput } from "../components/DolarInput";

type datafechedProps = {
  id: number;
  user_id: number;
  description: string;
  created_at: string;
  updated_at: string;
  value: number;
  type: "expenses" | "incomes" | "";
};

function Dashboard() {
  const { toast } = useToast();
  const [incomes, setIncomes] = useState<datafechedProps[]>([]);
  const [expenses, setExpenses] = useState<datafechedProps[]>([]);
  const [type, setType] = useState<datafechedProps["type"]>("");
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [id, setId] = useState(0);
  const [expensesTotal, setExpensesTotal] = useState(0);
  const [budgetAvailable, setBudgetAvailable] = useState(0);

  const isLg = useMediaQuery({ minWidth: 1024 });

  function validate(desc: string, amt: number) {
    if (desc === "") return false;
    else if (amt === 0) return false;
    return true;
  }

  async function handleSubmit({ desc, amt }: { desc: string; amt: number }) {
    if (validate(desc, amt)) {
      try {
        await api.post(type, { description: desc, value: amt });
        toast({
          title: "Success",
          description: `${
            type.charAt(0).toUpperCase() + type.slice(1)
          } created!`,
          variant: "success",
        });

        resetFields();

        if (type === "expenses") fetchExpenses();
        else fetchIncomes();
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
    } else {
      toast({
        title: "Error",
        description: "Verify the fields and try again",
        variant: "error",
      });
    }
  }

  function resetFields() {
    setType("");
    setDescription("");
    setAmount(0);
    setId(0);
  }

  async function handleUpdate({
    type,
    id,
    desc,
    amt,
  }: {
    type: "expenses" | "incomes" | "";
    desc: string;
    id: number;
    amt: number;
  }) {
    if (validate(desc, amt)) {
      try {
        await api.put(`${type}/${id}`, {
          description: desc,
          value: amt,
        });

        toast({
          title: "Success",
          description: `${
            type.charAt(0).toUpperCase() + type.slice(1)
          } Updated!`,
          variant: "success",
        });

        resetFields();

        if (type === "expenses") fetchExpenses();
        else fetchIncomes();
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
    } else {
      toast({
        title: "Error",
        description: "Verify the fields and try again",
        variant: "error",
      });
    }
  }

  function onIncomeUpdated() {
    fetchIncomes();
  }

  function onExpenseUpdated() {
    fetchExpenses();
  }

  const incomeContent = () => (
    <Table
      data={incomes}
      dataUpdated={onIncomeUpdated}
      type="incomes"
      updateItem={onItemUpdateClick}
    />
  );

  const expenseContent = () => (
    <Table
      data={expenses}
      dataUpdated={onExpenseUpdated}
      updateItem={onItemUpdateClick}
      type="expenses"
    />
  );

  function onItemUpdateClick(item: datafechedProps) {
    setId(item.id);
    setType(item.type);
    setDescription(item.description);
    setAmount(item.value);
  }

  function generateTabContents() {
    return [
      { value: "Expense", content: expenseContent() },
      { value: "Income", content: incomeContent() },
    ];
  }

  async function fetchIncomes() {
    try {
      const response = await api.get("incomes");

      response.data.forEach((income: datafechedProps) => {
        income.created_at = format(
          new Date(income.created_at),
          "MM/dd/yyyy hh:mm a"
        );
        income.type = "incomes";
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

      response.data.forEach((expense: datafechedProps) => {
        expense.created_at = format(
          new Date(expense.created_at),
          "MM/dd/yyyy hh:mm a"
        );
        expense.type = "expenses";
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

  useEffect(() => {
    fetchIncomes();
    fetchExpenses();
  }, []);

  useEffect(() => {
    let inc;
    let exp;
    if (incomes.length > 0) {
      inc = incomes.reduce((acc, income) => acc + Number(income.value), 0);
    } else inc = 0;

    if (expenses.length > 0) {
      exp = expenses.reduce((acc, expense) => acc + Number(expense.value), 0);
    } else exp = 0;

    const budget = inc - exp;

    setExpensesTotal(exp);
    setBudgetAvailable(budget);
  }, [expenses, incomes]);

  return (
    <div className="min-h-screen w-full bg-zinc-50 flex flex-col">
      <Header budgetAvailable={budgetAvailable} spent={expensesTotal} />
      <div className="grid grid-cols-2 gap-2 p-4 lg:hidden">
        <CardMoney
          value={budgetAvailable}
          type="budget"
          className="col-span-1 h-32"
        />
        <CardMoney
          type="spent"
          value={expensesTotal}
          className="col-span-1 h-32"
        />
      </div>
      <div className="flex-1 grid grid-cols-2 lg:grid-cols-12 gap-8 p-4">
        {/* Tabs + Mobile Transaction modal form  */}
        <div className="relative col-span-2 lg:col-span-8">
          <Tabs defaultValue="expense" contents={generateTabContents()} />
          {!isLg && (
            <AddDialog
              className="absolute top-0 right-4 lg:hidden"
              id={id}
              type={type}
              description={description}
              amount={amount}
              setDescription={setDescription}
              setAmount={setAmount}
              setType={setType}
              onUpdate={handleUpdate}
              onSubmit={handleSubmit}
              resetFields={resetFields}
            />
          )}
        </div>
        {/* Desktop Transaction Form */}
        <form className="hidden lg:flex flex-col gap-10 lg:col-span-4 py-14 border p-4 rounded-xl shadow-xl h-fit">
          <p className="text-xl text-violet-700 font-bold">
            {id ? `Update ${description}` : "Add New"}
          </p>
          <p className={`text-lg text-violet-500 -mt-10 ${id ? "" : "hidden"}`}>
            {id && type.charAt(0).toUpperCase() + type.slice(1)}
          </p>
          <Select
            className={id ? "hidden" : ""}
            label="Type"
            items={[
              { label: "Expense", value: "expenses" },
              { label: "Income", value: "incomes" },
            ]}
            onChange={(type: datafechedProps["type"]) => setType(type)}
            value={type}
          />
          <Input
            label="Description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <DolarInput
            label="Amount"
            name="amount"
            value={amount}
            onValueChange={(value) => setAmount(Number(value))}
          />
          <div className="w-full flex gap-2">
            <button
              type="button"
              className="w-full text-white bg-violet-500 p-4 rounded-full hover:scale-105 transition-transform"
              onClick={
                id
                  ? () =>
                      handleUpdate({ id, desc: description, amt: amount, type })
                  : () => handleSubmit({ desc: description, amt: amount })
              }
            >
              {id ? "Update" : "Create"}
            </button>
            <button
              type="button"
              className={`w-1/3 text-white bg-zinc-400 p-4 rounded-full hover:scale-105 transition-transform ${
                id ? "block" : "hidden"
              }`}
              onClick={resetFields}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Dashboard;
