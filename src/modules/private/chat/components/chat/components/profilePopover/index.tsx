import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DeleteChatModal } from "@/modals";
import { Delete, Forward, MoreVertical } from "lucide-react";

export const ProfilePopover = () => {
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
            className=" text-primary-text flex items-center gap-2 justify-between p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all rounded-md"
          >
            <span className="text-preset-7 font-medium">Remove Friend</span>
            <Delete className="size-4" />
          </div>
          <div
            role="button"
            className=" text-primary-text flex items-center gap-2 justify-between p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all rounded-md"
          >
            <span className="text-preset-7 font-medium">Block</span>
            <Forward className="size-4" />
          </div>

          <DeleteChatModal />
        </div>
      </PopoverContent>
    </Popover>
  );
};
