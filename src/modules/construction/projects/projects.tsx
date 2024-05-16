import { DataTable } from "@/components/ui/data-table";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { columns } from "./components/projects-data-table/columns";
import { projects } from "./components/projects-data-table/data";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

export function Projects() {
  return (
    <div className="h-full flex-1 flex-col space-y-8">
      <Breadcrumb
        items={[
          { label: "Constructora", path: "/construction" },
          { label: "Proyectos", path: "/construction/projects" },
        ]}
      />
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Proyectos</h2>
          <p className="text-muted-foreground">Listado de Proyectos</p>
        </div>
        <Button asChild>
          <Link to="new">
            <Plus className="size-4 mr-2" /> Nuevo Proyecto
          </Link>
        </Button>
      </div>
      <DataTable data={projects} columns={columns} />
    </div>
  );
}
