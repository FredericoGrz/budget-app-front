import { FaTrash } from "react-icons/fa";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

type removeConfirmationDialogProps = {
  transactionName: string;
  handleRemove: () => void;
};

export function RemoveConfirmationDialog({
  transactionName,
  handleRemove,
}: removeConfirmationDialogProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <FaTrash className="text-lg text-red-400 hover:text-red-600 mt-1 hover:scale-110 transition-all" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2">Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            <b className="block">{transactionName}</b> <br />
            This action cannot be undone. Are you sure you want to permanently
            delete this transaction?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-2 flex flex-row gap-2 justify-end items-center">
          <button
            type="button"
            className="text-white bg-red-500 p-2 rounded-xl w-2/3 lg:w-full hover:bg-red-600 transition-colors"
            onClick={handleRemove}
          >
            Delete
          </button>
          <DialogClose className="w-1/3">
            <button
              type="button"
              className="text-white bg-violet-300 p-2 rounded-xl w-full hover:bg-violet-400 transition-colors"
            >
              Cancel
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
