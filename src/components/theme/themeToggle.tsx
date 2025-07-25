import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "./themeProvider";

export const ThemeToggle = () => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenuPortal>
      <DropdownMenuSubContent className="bg-white dark:bg-neutral-900">
        <DropdownMenuItem
          className="hover:bg-neutral-100 dark:hover:bg-neutral-800"
          onClick={() => setTheme("light")}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          className="hover:bg-neutral-100 dark:hover:bg-neutral-800"
          onClick={() => setTheme("dark")}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          className="hover:bg-neutral-100 dark:hover:bg-neutral-800"
          onClick={() => setTheme("system")}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuPortal>
  );
};
