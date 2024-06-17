import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProjectsService } from '@/services/projects.service.ts';
import { IBuyer, IProject, IReserveUnitData, IUnitResponse, Money } from '@/types';
import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import { Messages } from '@/lib/constants.tsx';
import { RemoteComboBox } from '@/components/ui/remote-combobox.tsx';
import { CreateBuyerModal } from '@/modules/construction/buyers/create-buyer-modal.tsx';
import { z } from 'zod';
import { CompoundForm } from '@/components/ui/compound-form.tsx';
import { toast } from 'sonner';
import ClosableAlert from '@/components/ui/closable-alert.tsx';

export function ReserveUnit() {
  const [unit, setUnit] = useState<IUnitResponse>({ } as IUnitResponse );
  const { projectId, unitId } = useParams<{ projectId: string, unitId: string }>();
  const [project, setProject] = useState<IProject | undefined>({} as IProject);
  const projectService = new ProjectsService(projectId);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [buyer, setBuyer] = useState<IBuyer | undefined>();
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

  const reserverUnit = (data: Record<string, string | string[] | object | number>) => {
    const d = data as { buyer: IBuyer, salePrice: number, currency: string };
    const requestData: IReserveUnitData = {
      buyer: d.buyer.id,
      amount: data.amount as Money,
    };

    setLoading(true);
    projectService.reserveUnit(unit.name, requestData)
      .then(() => {
        toast.success('Unidad reservada correctamente');
        navigate(`/construction/projects/${projectId}/details?tab=units`)
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
          { label: "Reservar", path: "" }
        ]}
      />

      <div className="max-w-md mx-auto mt-8">
        {error && <ClosableAlert closable={false} color="danger">{error}</ClosableAlert>}
        <CompoundForm
          sendingRequest={loading}
          onSubmit={reserverUnit}
          title="Reservar Unidad"
          submitButtonText="Reservar Unidad"
          onCancel={() => navigate(-1)}
          alertDialogText="Confirmar"
          alertDialogDesc="¿Está seguro que desea cancelar la reserva de esta unidad?"
          confirmCancel={true}
          inputs={[
            {
              label: "Comprador",
              name: "buyer",
              defaultValue: "",
              type: "remote-combobox",
              remoteComboProps: {
                createModal: CreateBuyerModal,
                endpoint: "/api/v1/buyers",
                displayProperty: "name",
                valueProperty: "id",
              },
              placeholder: "Seleccione un cliente",
              validations: z.object({
                id: z.number(),
                name: z.string(),
              }, {
                message: "Seleccione un comprador"
              }),
            },
            {
              label: "Precio Reserva",
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
      <RemoteComboBox
        createModal={CreateBuyerModal}
        endpoint="/api/v1/buyers"
        handleSelect={(value: Record<string, string>) => setBuyer(value as IBuyer)}
        displayProperty="name"
        valueProperty="id"
        selectedValue={buyer as Record<string, string>}
        placeholder="Seleccione un cliente"/>

    </div>
  );
}
