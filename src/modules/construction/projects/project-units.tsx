import RemoteDataTable, { Column } from '@/components/ui/remote-data-table';
import { IProject, IProjectUnit, IProjectUnitPrice } from '@/types';
import { Link } from 'react-router-dom';
import { ProjectUnitState } from '@/modules/construction/projects/components/project-unit-state';
import { UnitRowActions } from '@/modules/construction/projects/components/unit-row-actions.tsx';
import Formats from '@/lib/formatters.ts';

type Props = {
  project: IProject | undefined;
}
export function ProjectUnits( {project}: Props ) {
  const columns: Column[] = [
    {
      "header": "Nombre",
      "field": "name",
      "render": (_cell, unit: IProjectUnit) =>
        <Link className="text-blue-600 underline hover:text-blue-800"
              to={`/construction/projects/${project?.id}/units/${unit.id}`}
              state={{ unit, project}}
        >
          {unit.name}
        </Link>
    },
    {
      "header": "Valor",
      "field": "price",
      "render": (price?: IProjectUnitPrice) =>  Formats.currency(price?.value)
    },
    {
      "header": "Estado",
      "field": "state",
      "render": (cell: string) => <ProjectUnitState state={cell}/>
    },
    {
      "field": "id",
      "header": "",
      "render": (_, unit: IProjectUnit) => <UnitRowActions
        project={project}
        unit={unit}/>
    }
  ]

  return <div>

    <RemoteDataTable
      path={`/api/v1/projects/${project?.id}/units`}
      columns={columns}
      filters={[]}
      searchFields={["name"]}
      gridChanged={false}
      style={{height: "calc(100vh - 350px)"}}
      defaultPageSize={100}/>
    </div>
}
