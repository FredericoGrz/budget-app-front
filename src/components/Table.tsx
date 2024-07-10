import { FaEdit } from "react-icons/fa";
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
import { RemoveConfirmationDialog } from "./RemoveConfirmationDialog";

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
        <TableRow className="hover:bg-transparent">
          <TableHead className="text-violet-800 w-[30%] text-xs sm:text-sm xs:w-[35%] sm:w-[45%] lg:w-[54%] xl:w-[60%]">
            Description
          </TableHead>
          <TableHead className="text-violet-800 w-[40%] text-xs sm:text-sm xs:w-[35%] sm:w-[35%] lg:w-[30%] xl:w-[22%]">
            Date
          </TableHead>
          <TableHead className="text-violet-800 w-[20%] text-xs sm:text-sm xs:w-[30%] sm:w-[20%] lg:w-[16%] xl:w-[13%]">
            Value
          </TableHead>
          <TableHead className="text-violet-800 text-xs sm:text-sm">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow
            key={item.id}
            className="text-violet-700/80 hover:text-violet-800 hover:bg-violet-50 transition-colors"
          >
            <TableCell className="text-xs sm:text-sm">
              {item.description}
            </TableCell>
            <TableCell className="text-xs sm:text-sm">
              {item.created_at}
            </TableCell>
            <TableCell className="text-xs sm:text-sm">$ {item.value}</TableCell>
            <TableCell className="flex gap-2 ">
              <button type="button" onClick={() => handleUpdate(item)}>
                <FaEdit className="text-lg text-blue-400 hover:text-blue-600 hover:scale-110 transition-all" />
              </button>
              <button type="button">
                <RemoveConfirmationDialog
                  handleRemove={() => handleDelete(item.id)}
                  transactionName={item.description}
                />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </ShadTable>
  );
}
