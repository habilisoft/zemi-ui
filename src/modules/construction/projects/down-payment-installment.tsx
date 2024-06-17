import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProjectsService } from '@/services/projects.service.ts';
import { DownPaymentInstallmentRequest, IProject, IUnitResponse, Money } from '@/types';
import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import { Messages } from '@/lib/constants.tsx';
import { z } from 'zod';
import { CompoundForm } from '@/components/ui/compound-form.tsx';
import { toast } from 'sonner';
import ClosableAlert from '@/components/ui/closable-alert.tsx';

export function DownPaymentInstallment() {
  const [unit, setUnit] = useState<IUnitResponse>({ } as IUnitResponse );
  const { projectId, unitId } = useParams<{ projectId: string, unitId: string }>();
  const [project, setProject] = useState<IProject | undefined>({} as IProject);
  const projectService = new ProjectsService(projectId);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    projectService.getUnit(unitId)
      .then((unitData) => {
        setUnit(unitData);
      })
      .catch(({ response }) => {
        setError(response?.data?.message || Messages.UNEXPECTED_ERROR);
      })
      .finally(() => setLoading(false));

    projectService.getProject()
      .then((projectData) => {
        setProject(projectData);
      })
      .catch(({ response }) => {
        setError(response?.data?.message || Messages.UNEXPECTED_ERROR);
      })
      .finally(() => setLoading(false));
  }, []);

  const downPaymentInstallment = (data: Record<string, string | string[] | object | number>) => {
    const requestData: DownPaymentInstallmentRequest = {
      amount: data.amount as Money,
    };

    setLoading(true);
    projectService.downPaymentInstallment(unit.name, requestData)
      .then(() => {
        toast.success('Abono a inicial aplicado correctamente');
        navigate(`/construction/projects/${projectId}/units/${unit.id}`)
      })
      .catch(({response}) => {
        setError(response?.data?.message || Messages.UNEXPECTED_ERROR);
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="h-full flex-1 flex-col space-y-4">
      <Breadcrumb
        items={[
          { label: "Constructora", path: "/construction" },
          { label: "Proyectos", path: "/construction/projects" },
          { label: project?.name || "", path: `/construction/projects/${project?.id}/details` },
          { label: "Unidades" || "", path: `/construction/projects/${project?.id}/details?tab=units` },
          { label: unit?.name || "", path: `/construction/projects/${project?.id}/units/${unit?.id}` },
          { label: "Abono a inicial", path: "" }
        ]}
      />

      <div className="max-w-md mx-auto mt-8">
        {error && <ClosableAlert closable={false} color="danger">{error}</ClosableAlert>}
        <CompoundForm
          sendingRequest={loading}
          onSubmit={downPaymentInstallment}
          title="Abono a Inicial"
          submitButtonText="Aplicar Abono"
          onCancel={() => navigate(-1)}
          alertDialogText="Confirmar"
          alertDialogDesc="¿Está seguro que desea cancelar esta operación?"
          alertAcceptButtonText="Si, estoy seguro"
          confirmCancel={true}
          inputs={[
            {
              label: "Monto Abono",
              name: "amount",
              type: "money",
              defaultValue: { value: 1, currency: "USD" },
              validations: z.object({
                currency: z.string(),
                value: z.number().min(1, { message: "Debe ser mayor a 0" })
              }).refine(({ value }) => value > 0, { message: "Debe ser mayor a 0" }),
            },
          ]}
        />
      </div>
    </div>
  );
}
