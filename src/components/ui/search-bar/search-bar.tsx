import { Search } from "lucide-react";
import { Input } from "../input";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  inputClassName?: string;
};

export const SearchBar = ({ className, inputClassName }: Props) => {
  return (
    <div
      className={cn(
        "bg-neutral-800 border border-neutral-700 rounded-md flex items-center px-3 ",
        className
      )}
    >
      <Search size={18} className="text-neutral-400" />
      <Input
        placeholder="Buscar..."
        className={cn(
          "focus:border-amber-700 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 h-8 text-white placeholder-neutral-400",
          inputClassName
        )}
      />
    </div>
  );
};
