import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings as SettingsIcon, SunMoon } from "lucide-react";
import { ThemeToggle } from "@/components/theme/themeToggle";

export const Settings = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SettingsIcon className="size-5 text-neutral-500 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800"
        align="start"
      >
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:bg-neutral-100 dark:focus:bg-neutral-800">
            <div className="flex items-center gap-2">
              <SunMoon className="size-4" />
              <span>Theme</span>
            </div>
          </DropdownMenuSubTrigger>
          <ThemeToggle />
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
