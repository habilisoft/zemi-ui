import { Info } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";

export function ExchangeRate() {
  return (
    <Popover>
      <PopoverTrigger className="flex items-center gap-2 text-white hover:text-amber-400">
        Tasa de Cambio: DOP 58.28 <Info size={14} />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-[300px] bg-neutral-900 border-neutral-700 text-white"
      >
        <div className="p-4 space-y-2">
          <div className="text-white">
            <p className="text-lg">Tasa de Dolar</p>
          </div>
          <div className="text-white">
            <p className="text-xs">Compra</p>
            <p className="text-lg text-amber-400">DOP 58.28</p>
          </div>
          <div className="text-white">
            <p className="text-xs">Venta</p>
            <p className="text-lg text-amber-400">DOP 59.28</p>
          </div>
          <div className="text-white">
            <p className="text-xs">Fuente</p>
            <p className="text-lg text-amber-400">Banco Santa Cruz</p>
          </div>
          <div className="flex items-center justify-between pt-8">
            <Button variant="ghost">Actualizar</Button>
            <Button variant="ghost">Configurar</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
