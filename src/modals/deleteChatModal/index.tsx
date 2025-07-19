import { Button } from "@/components";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";

export const DeleteChatModal = () => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <div
            role="button"
            className=" text-red-600 dark:text-red-400 flex items-center gap-2 justify-between p-2 hover:bg-red-600/10  transition-all rounded-md"
          >
            <span className="text-preset-7 font-medium">Delete Chat</span>
            <Trash className="size-4" />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[530px] bg-white dark:bg-neutral-900">
          <DialogHeader>
            <DialogTitle className="text-primary-text !text-preset-4">
              Delete chat with Jenny
            </DialogTitle>
            <DialogDescription className="text-secondary-text !text-preset-6">
              Are you sure you want to delete this chat? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-8">
            <DialogClose asChild>
              <Button variant="secondary" label="Cancel" />
            </DialogClose>
            <Button variant="danger" label="Delete Chat" />
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
