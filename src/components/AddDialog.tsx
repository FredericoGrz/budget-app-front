import { useState } from "react";
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
import { api } from "../services/api";
import { useToast } from "./ui/use-toast";
import { CustomError } from "../types/errorTypes";

type AddDialogProps = {
  className?: string;
  onUpdate: (type: string) => void;
};

export function AddDialog({ className = "", onUpdate }: AddDialogProps) {
  const { toast } = useToast();
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  async function handleSubmit() {
    if (validate()) {
      try {
        await api.post(`${type}s`, { description, value: amount });
        toast({
          title: "Success",
          description: `${
            type.charAt(0).toUpperCase() + type.slice(1)
          } created!`,
          variant: "success",
        });

        if (onUpdate) {
          onUpdate(type);
        }

        setType("");
        setDescription("");
        setAmount(0);
        setIsDialogOpen(false);
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

  function validate() {
    if (type !== "expense" && type !== "income") return false;
    else if (description === "") return false;
    else if (amount === 0) return false;
    return true;
  }

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(value) => setIsDialogOpen(value)}
    >
      <DialogTrigger
        className={`p-2 bg-violet-200 rounded-full hover:scale-110 transition-transform ${className}`}
      >
        <FaPlus className="text-violet-700" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New</DialogTitle>
          <DialogDescription>Add a new Income/Expense</DialogDescription>
        </DialogHeader>
        <form action="" className="flex flex-col gap-2">
          <Select
            label="Type"
            items={[
              { label: "Expense", value: "expense" },
              { label: "Income", value: "income" },
            ]}
            onChange={(type) => setType(type)}
          />
          <Input
            label="Description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            label="Amount"
            type="number"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </form>
        <DialogFooter>
          <button
            type="submit"
            className="text-white bg-violet-500 p-2 rounded-full"
            onClick={handleSubmit}
          >
            Create
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
