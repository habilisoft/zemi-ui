import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProjectsService } from '@/services/projects.service.ts';
import { IBuyer, IProject, IReserveUnitData, IUnitResponse, Money } from '@/types';
import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import { Messages } from '@/lib/constants.tsx';
import { CreateBuyerModal } from '@/modules/construction/buyers/create-buyer-modal.tsx';
import { z } from 'zod';
import { CompoundForm } from '@/components/ui/compound-form.tsx';
import { toast } from 'sonner';
import ClosableAlert from '@/components/ui/closable-alert.tsx';

export function ReserveUnit() {
  const [unit, setUnit] = useState<IUnitResponse>({} as IUnitResponse);
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

  const reserverUnit = (data: Record<string, string | string[] | object | number>) => {
    const requestData = getRequestData(data);
    setLoading(true);
    projectService.reserveUnit(unit.name, requestData)
      .then(() => {
        toast.success('Unidad reservada correctamente');
        navigate(`/construction/projects/${projectId}/details?tab=units`)
      })
      .catch(({ response }) => {
        setError(response?.data?.message || Messages.UNEXPECTED_ERROR);
      })
      .finally(() => setLoading(false));
  }

  const getRequestData = (data: Record<string, string | string[] | object | number>): IReserveUnitData => {
    const d = data as { buyer: IBuyer, cashAmount: Money, paymentMethod: string };

    const requestData: IReserveUnitData = {
      buyer: d.buyer.id,
      payment: {
        paymentMethods: []
      }
    };

    if (d.paymentMethod.includes("CASH")) {
      requestData.payment.paymentMethods.push({
        amount: d.cashAmount,
        type: "CASH"
      });
    }
    return requestData;
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
              label: "Forma de Pago",
              name: "paymentMethod",
              type: "checkbox",
              defaultValue: ["CASH"],
              options: [
                { label: "Efectivo", value: "CASH" },
                //{ label: "Transferencia", value: "TRANSFER" },
                //{ label: "Cheque", value: "CHECK" },
                //{ label: "Tarjeta de Crédito", value: "CARD"}
              ],
              validations: z
                .array(z.string())
                .refine((value) => value.some((item) => item), {
                  message: "You have to select at least one option.",
                }),
            },
            {
              label: "Número de Cheque",
              name: "checkNumber",
              type: "text",
              defaultValue: "1",
              validations: z.string().min(1, { message: "Debe tener al menos 1 digito" }),
              showIf: [{ field: "paymentMethod", value: "CHECK", includes: "CHECK" }]
            },
            {
              label: "Monto Pago Efectivo",
              name: "cashAmount",
              type: "money",
              defaultValue: { value: 1, currency: "USD" },
              showIf: [{ field: "paymentMethod", value: "CASH", includes: "CASH" }],
              validations: z.object({
                currency: z.string(),
                value: z.number().min(1, { message: "Debe ser mayor a 0" })
              }).refine(({ value }) => value > 0, { message: "Debe ser mayor a 0" }),
            },
            {
              label: "Monto Pago Tarjeta",
              name: "cardAmount",
              type: "money",
              defaultValue: { value: 1, currency: "USD" },
              showIf: [{ field: "paymentMethod", value: "CARD", includes: "CARD" }],
              validations: z.object({
                currency: z.string(),
                value: z.number().min(1, { message: "Debe ser mayor a 0" })
              }).refine(({ value }) => value > 0, { message: "Debe ser mayor a 0" }),
            },
            {
              label: "Ultimos 4 digitos de la tarjeta",
              name: "last4",
              type: "text",
              defaultValue: "1234",
              validations: z.string().min(4, { message: "Debe tener al menos 4 digitos" }),
              showIf: [{ field: "paymentMethod", value: "CARD", includes: "CARD" }]
            }
          ]}
        />
      </div>
    </div>
  );
}
