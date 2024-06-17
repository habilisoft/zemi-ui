import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import RemoteDataTable, { Column } from '@/components/ui/remote-data-table';
import { IProject } from '@/types';
import PageTitle from '@/components/ui/page-title.tsx';
// import { useState } from "react";
// import { useProjects } from "@/hooks/projects";

export function Projects() {
  // const [searchTerm, setSearchTerm] = useState("")
  // const {projects, isLoading} = useProjects(searchTerm)

  // if(isLoading) return null;

  const columns: Column[] = [
    {
      "header": "Nombre",
      "field": "name",
      "render": (_cell, row: IProject) => <Link className="link"
                                                to={`/construction/projects/${row.id}/details`}>{row.name}</Link>
    }
  ]

  return (
    <div className="h-full flex-1 flex-col space-y-4">
      <Breadcrumb
        items={[
          { label: "Constructora", path: "/construction" },
          { label: "Proyectos", path: "/construction/projects" },
        ]}
      />
      <div className="flex items-center justify-between space-y-2">
        <PageTitle title="Projectos" subtitle="Listado de Projectos"/>
        <Button asChild>
          <Link to="new">
            <Plus className="size-4 mr-2"/> Nuevo Proyecto
          </Link>
        </Button>
      </div>
      <RemoteDataTable
        path="/api/v1/projects"
        columns={columns}
        placeholder="Buscar por nombre"
        gridChanged={false}
        reload={false}
        filters={[]}
        style={{ height: "calc(100vh - 350px)" }}
        searchFields={["name"]}
        defaultPageSize={25}/>
    </div>
  );
}
