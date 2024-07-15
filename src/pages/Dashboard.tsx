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
import { Skeleton } from "../components/ui/skeleton";
import { Button } from "../components/Button";

type datafechedProps = {
  id: number;
  user_id: number;
  description: string;
  created_at: string;
  updated_at: string;
  value: number;
  type: "expenses" | "incomes" | "";
};

type errorProps = {
  type?: string;
  description?: string;
  amount?: string;
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
  const [addDialogIsOpen, setAddDialogIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<errorProps>({});

  const isLg = useMediaQuery({ minWidth: 1024 });

  function onDescriptionChange(e: React.ChangeEvent<HTMLInputElement>) {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.description; // Remove the 'description' property
      return newErrors;
    });
    setDescription(e.target.value);
  }

  function onAmountChange(value: number | undefined) {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.amount; // Remove the 'amount' property
      return newErrors;
    });
    setAmount(Number(value));
  }

  function validate(desc: string, amt: number) {
    let retorno = true;
    let err = {};

    if (desc === "") {
      err = { ...err, description: "Field is required" };

      retorno = false;
    }
    if (amt === 0 || amt === undefined) {
      err = { ...err, amount: "Amount must be greater than zero" };
      retorno = false;
    }

    setErrors((prev) => {
      return {
        ...prev,
        ...err,
      };
    });

    return retorno;
  }

  async function handleSubmit({ desc, amt }: { desc: string; amt: number }) {
    if (validate(desc, amt)) {
      try {
        setIsSubmitting(true);
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
        const typedError = error as CustomError;
        console.log(error);
        console.log(typedError.response);
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
    setIsSubmitting(false);
  }

  function resetFields() {
    setType("");
    setDescription("");
    setAmount(0);
    setId(0);
    setAddDialogIsOpen(false);
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
        setIsSubmitting(true);
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
    setIsSubmitting(false);
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
      setIsLoading(true);
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
    setIsLoading(false);
  }

  async function fetchExpenses() {
    try {
      setIsLoading(true);
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
    setIsLoading(false);
  }

  useEffect(() => {
    fetchIncomes();
    fetchExpenses();
  }, []);

  useEffect(() => {
    setIsLoading(true);
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
    setIsLoading(false);
  }, [expenses, incomes]);

  return (
    <div className="min-h-screen w-full bg-zinc-50 flex flex-col">
      <Header
        isLoading={isLoading}
        budgetAvailable={budgetAvailable}
        spent={expensesTotal}
      />
      {/* Cards Mobile Budget and Spent */}
      {isLoading ? (
        <div className="grid grid-cols-2 gap-2 p-4 lg:hidden">
          <Skeleton className="col-span-1 h-32" />
          <Skeleton className="col-span-1 h-32" />
        </div>
      ) : (
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
      )}

      <div className="flex-1 grid grid-cols-2 lg:grid-cols-12 gap-8 p-4">
        {/* Tabs + Mobile Transaction modal form  */}
        {isLoading ? (
          <div className="col-span-2 lg:col-span-8 flex flex-col gap-2">
            <Skeleton className="w-36 h-10" />
            <Skeleton className="w-full h-full" />
          </div>
        ) : (
          <div className="relative col-span-2 lg:col-span-8">
            <Tabs defaultValue="expense" contents={generateTabContents()} />
            {!isLg && (
              <AddDialog
                className="absolute top-0 right-4 lg:hidden"
                id={id}
                type={type}
                description={description}
                amount={amount}
                setDescription={onDescriptionChange}
                setAmount={onAmountChange}
                setType={setType}
                onUpdate={handleUpdate}
                onSubmit={handleSubmit}
                resetFields={resetFields}
                isOpen={addDialogIsOpen}
                setIsOpen={setAddDialogIsOpen}
                isSubmitting={isSubmitting}
                errors={errors}
              />
            )}
          </div>
        )}
        {/* Desktop Transaction Form */}
        <form className="hidden lg:flex flex-col gap-10 lg:col-span-4 py-14 border p-4 rounded-xl shadow-xl h-fit">
          <p className="text-xl text-violet-700 font-bold">
            {id ? `Update ${description}` : `Add New ${type.slice(0, -1)}`}
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
            onChange={onDescriptionChange}
            error={errors.description && errors.description}
          />
          <DolarInput
            label="Amount"
            name="amount"
            value={amount}
            onValueChange={(value) => onAmountChange(value)}
            error={errors.amount && errors.amount}
          />
          <div className="w-full flex gap-2">
            <Button
              type="button"
              title={id ? "Update" : "Create"}
              variant="save"
              className="w-full hover:scale-105 transition-transform"
              isLoading={isSubmitting}
              onClick={
                id
                  ? () =>
                      handleUpdate({ id, desc: description, amt: amount, type })
                  : () => handleSubmit({ desc: description, amt: amount })
              }
            />

            <Button
              type="button"
              variant="cancel"
              onClick={resetFields}
              title="Cancel"
              className={`w-1/3 hover:scale-105 transition-transform ${
                id ? "block" : "hidden"
              }`}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Dashboard;
