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
import { Button } from "./Button";

type removeConfirmationDialogProps = {
  transactionName: string;
  handleRemove: () => void;
  isSubmitting: boolean;
};

export function RemoveConfirmationDialog({
  transactionName,
  handleRemove,
  isSubmitting = false,
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
          <Button
            type="button"
            title="Delete"
            variant="delete"
            className="p-2 rounded-xl w-2/3 lg:w-full"
            onClick={handleRemove}
            isLoading={isSubmitting}
          />
          <DialogClose className="w-1/3">
            <Button
              type="button"
              title="Cancel"
              variant="cancel"
              className="p-2 rounded-xl w-full"
            />
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
