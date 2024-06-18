import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import PageTitle from '@/components/ui/page-title.tsx';
import { ProjectsService } from '@/services/projects.service.ts';
import { useEffect, useState } from 'react';
import { IProject } from '@/types';
import { CompoundForm } from '@/components/ui/compound-form.tsx';
import { z } from "zod";

export function InitDownPaymentInstallment() {
  const projectsService = new ProjectsService();
  const [projects, setProjects] = useState<IProject[]>();

  useEffect(() => {
    projectsService.getProjects()
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const onSubmit = (data: Record<string, string | string[]>) => {
    console.log(data);
  }

  return (
    <div className="h-full flex-1 flex-col space-y-4">
      <Breadcrumb
        items={[
          { label: "Pagos", path: "" },
          { label: "Cuota de inicial", path: "/company-settings" },
        ]}
      />
      <div className="flex items-center justify-between space-y-2">
        <PageTitle title="Cuota de inicial" subtitle="Pagos"/>
      </div>

      <CompoundForm
        sendingRequest={false}
        onSubmit={onSubmit}
        submitButtonText="Continuar"
        inputs={
          [
            {
              label: "Proyecto",
              name: "project",
              type: "select",
              options: projects?.map((project) => ({
                value: String(project?.id), label: project.name
              })),
              validations: z.string(),
              defaultValue: String(projects?.[0]?.id),
            },
          ]
        }/>

    </div>
  );
}
