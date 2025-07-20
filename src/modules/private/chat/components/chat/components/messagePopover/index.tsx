import { deleteMessage } from "@/api/messages";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { Copy, Forward, MoreVertical, Trash } from "lucide-react";

interface Message {
  _id: string;
  sender: "me" | "other";
  content: string;
  timestamp: string;
}

export const MessagePopover = (message: Message) => {
  const queryClient = new QueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteMessage,
    onSuccess: (res) => {
      console.log("res", res);
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
    onError: (err) => {
      console.log("err", err);
    },
  });

  const handleDelete = () => {
    console.log("message._id", message._id);
    mutate(message._id as string);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <MoreVertical className="size-5 text-neutral-500 dark:text-neutral-300 hover:text-blue-600" />
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        className="max-w-[180px] shadow-none p-1 dark:bg-neutral-900 rounded-lg"
      >
        <div className="flex flex-col gap-1">
          <div
            role="button"
            onClick={async () =>
              await navigator.clipboard.writeText(message.content)
            }
            className=" text-primary-text flex items-center gap-2 justify-between p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all rounded-md"
          >
            <span className="text-preset-7 font-medium">Copy</span>
            <Copy className="size-4" />
          </div>
          <div
            role="button"
            className=" text-primary-text flex items-center gap-2 justify-between p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all rounded-md"
          >
            <span className="text-preset-7 font-medium">Forward</span>
            <Forward className="size-4" />
          </div>

          <div
            role="button"
            onClick={handleDelete}
            className=" text-red-600 dark:text-red-400 flex items-center gap-2 justify-between p-2 hover:bg-red-600/10  transition-all rounded-md"
          >
            <span className="text-preset-7 font-medium">Delete</span>
            <Trash className="size-4" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
