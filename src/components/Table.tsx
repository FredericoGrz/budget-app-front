import { FaEdit, FaTrash } from "react-icons/fa";
import {
  Table as ShadTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { api } from "../services/api";
import { useToast } from "./ui/use-toast";
import { CustomError } from "../types/errorTypes";

type TableProps = {
  data: {
    id: number;
    user_id: number;
    description: string;
    created_at: string;
    updated_at: string;
    value: number;
    type: "expenses" | "incomes" | "";
  }[];
  type: "expenses" | "incomes" | "";
  dataUpdated: () => void;
  updateItem: (item: dataProps) => void;
};

type dataProps = {
  id: number;
  user_id: number;
  description: string;
  created_at: string;
  updated_at: string;
  value: number;
  type: "expenses" | "incomes" | "";
};

export function Table({ data, type, dataUpdated, updateItem }: TableProps) {
  const { toast } = useToast();

  async function handleDelete(id: number) {
    // Delete the item
    try {
      await api.delete(`${type}/${id}`);
      dataUpdated();

      toast({
        title: "Success",
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} deleted!`,
        variant: "success",
      });
    } catch (error) {
      const typedError = error as CustomError;
      const errorMessage = typedError.response?.data?.message;

      toast({
        title: "Error",
        description: errorMessage,
        variant: "error",
      });
    }
  }

  async function handleUpdate(item: dataProps) {
    if (updateItem) updateItem(item);
  }
  return (
    <ShadTable>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[30%]">Description</TableHead>
          <TableHead className="w-[40%]">Date</TableHead>
          <TableHead className="w-[20%]">Value</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.description}</TableCell>
            <TableCell>{item.created_at}</TableCell>
            <TableCell>$ {item.value}</TableCell>
            <TableCell className="flex gap-2">
              <button type="button" onClick={() => handleUpdate(item)}>
                <FaEdit className="text-lg text-blue-400 hover:text-blue-600 hover:scale-110 transition-all" />
              </button>
              <button type="button" onClick={() => handleDelete(item.id)}>
                <FaTrash className="text-lg text-red-400 hover:text-red-600 hover:scale-110 transition-all" />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </ShadTable>
  );
}
