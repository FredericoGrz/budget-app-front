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
import { Button } from "./Button";

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
  setDescription: (e: React.ChangeEvent<HTMLInputElement>) => void;
  amount: number;
  setAmount: (value: number | undefined) => void;
  type: "expenses" | "incomes" | "";
  setType: React.Dispatch<React.SetStateAction<"expenses" | "incomes" | "">>;
  id: number;
  resetFields: () => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSubmitting: boolean;
  errors?: {
    type?: string;
    description?: string;
    amount?: string;
  };
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
  isSubmitting,
  errors,
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
            onChange={setDescription}
            error={errors?.description && errors.description}
          />
          <DolarInput
            label="Amount"
            name="amount"
            value={amount}
            onValueChange={setAmount}
            error={errors?.amount && errors.amount}
          />
        </form>
        <DialogFooter className="w-full flex flex-row gap-2">
          <Button
            type="button"
            variant="save"
            title={id ? "Update" : "Create"}
            onClick={id ? handleUpdate : handleSubmit}
            className="w-full p-2"
            isLoading={isSubmitting}
          />

          <Button
            title="Cancel"
            variant="cancel"
            type="button"
            onClick={resetFields}
            className={`w-1/3 p-2 ${id ? "block" : "hidden"}`}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
