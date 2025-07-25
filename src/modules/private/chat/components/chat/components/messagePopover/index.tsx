import { deleteMessage } from "@/api/messages";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { IMessage } from "@/types/global";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { Copy, Forward, MoreVertical, Trash, Reply, Edit } from "lucide-react";

export const MessagePopover = (message: IMessage) => {
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
    mutate(message._id as string);
  };

  return (
    <div className="absolute top-0 right-0 flex items-center gap-1 p-1 bg-white border border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800 rounded-md -mt-8">
      <div className=" flex items-center justify-center size-8 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all">
        <Reply className="size-5  text-neutral-500 dark:text-neutral-300 hover:text-blue-600" />
      </div>
      <div className="  flex items-center justify-center size-8 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all">
        <Edit className="size-5  text-neutral-500 dark:text-neutral-300 hover:text-blue-600" />
      </div>
      <div className=" flex items-center justify-center size-8 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all">
        <Copy className="size-5  text-neutral-500 dark:text-neutral-300 hover:text-blue-600" />
      </div>
      <div className=" flex items-center justify-center size-8 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all">
        <Forward className="size-5  text-neutral-500 dark:text-neutral-300 hover:text-blue-600" />
      </div>
      <div className=" flex items-center justify-center size-8 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all">
        <Trash className="size-5  text-neutral-500 dark:text-neutral-300 hover:text-blue-600" />
      </div>

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

            <div className="w-full h-[1px] bg-neutral-200 dark:bg-neutral-800"></div>

            <div
              role="button"
              onClick={handleDelete}
              className=" text-red-600  dark:text-red-00 flex items-center gap-2 justify-between p-2 hover:bg-red-600/10  transition-all rounded-md"
            >
              <span className="text-preset-7 font-medium">Delete</span>
              <Trash className="size-4" />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
