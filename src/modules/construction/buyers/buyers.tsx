import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Column, RemoteDataTable } from '@/components/ui/remote-data-table';
import { IProject } from '@/types';
import PageTitle from '@/components/ui/page-title.tsx';
import { PageWrapper } from '@/components/ui/page-wrapper.tsx';

export function Buyers() {

  const columns: Column[] = [
    {
      "header": "Nombre",
      "field": "name",
      "render": (_cell, row: IProject) => <Link className="text-blue-600 underline hover:text-blue-800"
                                                to={`/construction/buyers/${row.id}`}>{row.name}</Link>
    }
  ]

  return (
    <PageWrapper>
      <Breadcrumb
        items={[
          { label: "Constructora", path: "/construction" },
          { label: "Clientes", path: "/construction/clients" },
        ]}
      />
      <div className="flex items-center justify-between space-y-2">
        <PageTitle title="Clientes" subtitle="Listado de Clientes"/>
        <Button asChild>
          <Link to="new">
            <Plus className="size-4 mr-2"/> Nuevo Cliente
          </Link>
        </Button>
      </div>
      <RemoteDataTable
        path="/api/v1/buyers"
        columns={columns}
        placeholder="Buscar por nombre"
        gridChanged={false}
        reload={false}
        filters={[]}
        style={{ height: "calc(100vh - 350px)" }}
        searchFields={["name"]}
        defaultPageSize={25}/>
    </PageWrapper>
  );
}
