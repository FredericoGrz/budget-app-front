import { useEffect } from "react";
import { Input } from "./Input";
import { Select } from "./Select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { FaPlus } from "react-icons/fa";
import { DolarInput } from "./DolarInput";

interface SubmitProps {
  desc: string;
  amt: number;
}

interface updateProps {
  id: number;
  desc: string;
  amt: number;
  type: "expenses" | "incomes" | "";
}

type AddDialogProps = {
  className?: string;
  onUpdate: (props: updateProps) => void;
  onSubmit: (props: SubmitProps) => void;
  isUpdate?: boolean;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  type: "expenses" | "incomes" | "";
  setType: React.Dispatch<React.SetStateAction<"expenses" | "incomes" | "">>;
  id: number;
  resetFields: () => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function AddDialog({
  className = "",
  onUpdate,
  onSubmit,
  description,
  setDescription,
  amount,
  setAmount,
  type,
  setType,
  id,
  resetFields,
  isOpen,
  setIsOpen,
}: AddDialogProps) {
  function handleSubmit() {
    onSubmit({ desc: description, amt: amount });
  }

  function handleUpdate() {
    onUpdate({ desc: description, amt: amount, id, type });
  }

  useEffect(() => {
    if (id > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [id]);

  return (
    <Dialog open={isOpen} onOpenChange={(value) => setIsOpen(value)}>
      <DialogTrigger
        className={`p-2 bg-violet-200 rounded-full hover:scale-110 transition-transform ${className}`}
      >
        <FaPlus className="text-violet-700" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-violet-800">
            {id ? `Update ${description}` : "Add New"}
          </DialogTitle>
          <DialogDescription className="text-violet-600">
            {id ? `Update ${type}` : "Add a new Income/Expense"}
          </DialogDescription>
        </DialogHeader>
        <form action="" className="flex flex-col gap-2">
          <Select
            className={id ? "hidden" : ""}
            label="Type"
            items={[
              { label: "Expense", value: "expenses" },
              { label: "Income", value: "incomes" },
            ]}
            onChange={(type) => setType(type)}
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
        </form>
        <DialogFooter className="w-full flex flex-row gap-2">
          <button
            type="button"
            className="text-white bg-violet-500 p-2 rounded-full w-full"
            onClick={id ? handleUpdate : handleSubmit}
          >
            {id ? "Update" : "Create"}
          </button>
          <button
            type="button"
            className={`text-white bg-zinc-300 p-2 rounded-full w-1/3 ${
              id ? "block" : "hidden"
            }`}
            onClick={resetFields}
          >
            Cancel
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
