import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import PageTitle from '@/components/ui/page-title.tsx';
import { ProjectsService } from '@/services/projects.service.ts';
import { IProject, IProjectUnit } from '@/types';

export function UnitDetails() {
  const { state } = useLocation();
  const [unit, setUnit] = useState<IProjectUnit>({} as IProjectUnit);
  const [project, setProject] = useState<IProject>({} as IProject);
  const { projectId, unitId } = useParams();
  const projectService = new ProjectsService(projectId);

  useEffect(() => {
    async function fetchData() {
      const projectResponse = await projectService.getProject();
      setProject(projectResponse);
      const unitResponse = await projectService.getUnit(unitId);
      setUnit(unitResponse);
    }
    if (state?.unit) {
      setUnit(state.unit);
      setProject(state.project);
    } else {
      fetchData();
    }
  }, []);

  return (
    <div className="h-full flex-1 flex-col space-y-4">
      <Breadcrumb
        items={[
          { label: "Constructora", path: "/construction" },
          { label: "Proyectos", path: "/construction/projects" },
          { label: project.name, path: `/construction/projects/${project.id}/details` },
          { label: unit.name, path: `/construction/projects/1/units/${unit.name}` },
        ]}
      />
      <div className="flex items-center justify-between space-y-2">
        <div>
          <PageTitle title={unit?.name} subtitle={project.name}/>
        </div>
      </div>
    </div>
  );
}
