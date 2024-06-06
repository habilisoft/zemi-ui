import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IProject, IProjectUnit } from '@/types';
import { Link } from 'react-router-dom';

interface Props {
  unit: IProjectUnit
  project: IProject | undefined
}

export function UnitRowActions({
  unit,
  project
}: Props) {
  console.log(unit);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {unit.state === 'AVAILABLE' && <DropdownMenuItem
          asChild>
          <Link to={`/construction/projects/${project?.id}/units/${unit.id}/reserve`}>
            Reservar
          </Link>
          </DropdownMenuItem>}
        {unit.state === 'RESERVED' && <DropdownMenuItem>Abono a Inicial</DropdownMenuItem>}
        <DropdownMenuSeparator />
        <DropdownMenuItem>Editar</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Eliminar</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
