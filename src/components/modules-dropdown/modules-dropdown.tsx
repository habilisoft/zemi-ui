import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";
import { MODULES } from "@/constants";
import { Grip } from "lucide-react";
import { Link } from "react-router-dom";

export const ModulesDropdown = () => {
  return (
    <Popover>
      <PopoverTrigger className="flex items-center font-bold gap-2 text-white hover:text-amber-400">
        <Grip size={20} />
        Módulos
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[300px] bg-neutral-900 border-neutral-700 text-white"
      >
        {MODULES.map(({ title, icon, path }, i) => {
          const Icon = icon;
          return (
            <PopoverClose asChild key={i}>
              <Link
                to={path}
                className="flex items-center gap-3 px-2 py-3 rounded-md transition hover:bg-neutral-800 hover:text-amber-400"
              >
                <Icon className="size-5" />
                {title}
              </Link>
            </PopoverClose>
          );
        })}
      </PopoverContent>
    </Popover>
  );
};
