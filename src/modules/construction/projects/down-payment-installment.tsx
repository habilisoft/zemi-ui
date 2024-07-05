import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProjectsService } from '@/services/projects.service.ts';
import {
  DownPaymentInstallmentRequest,
  IBuyer,
  IDownPaymentInstallmentResponse,
  IProject,
  IUnitDetailResponse,
  Money
} from '@/types';
import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import { Messages } from '@/lib/constants.tsx';
import { z } from 'zod';
import { CompoundForm } from '@/components/ui/compound-form.tsx';
import { toast } from 'sonner';
import ClosableAlert from '@/components/ui/closable-alert.tsx';
import PageTitle from '@/components/ui/page-title.tsx';
import Formatters from '@/lib/formatters.ts';
import { PageWrapper } from '@/components/ui/page-wrapper.tsx';

export function DownPaymentInstallment() {
  const [unitResponse, setUnitResponse] = useState<IUnitDetailResponse>({ } as IUnitDetailResponse );
  const { projectId, unitId } = useParams<{ projectId: string, unitId: string }>();
  const [project, setProject] = useState<IProject | undefined>({} as IProject);
  const projectService = new ProjectsService(projectId);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    projectService.getUnit(unitId)
      .then((unitData) => {
        setUnitResponse(unitData);
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
    const requestData = getRequestData(data);

    setLoading(true);
    projectService.downPaymentInstallment(unitResponse?.name, requestData)
      .then((response: IDownPaymentInstallmentResponse) => {
        toast.success('Abono a inicial aplicado correctamente');
        navigate(`/construction/payments/receipts/${response.id}`);
      })
      .catch(({response}) => {
        setError(response?.data?.message || Messages.UNEXPECTED_ERROR);
      })
      .finally(() => setLoading(false));
  }

  const getRequestData = (data: Record<string, string | string[] | object | number>): DownPaymentInstallmentRequest => {
    const d = data as { buyer: IBuyer, cashAmount: Money, paymentMethod: string };

    const requestData: DownPaymentInstallmentRequest = {
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
    <PageWrapper>
      <Breadcrumb
        items={[
          { label: "Constructora", path: "/construction" },
          { label: "Proyectos", path: "/construction/projects" },
          { label: project?.name || "", path: `/construction/projects/${project?.id}/details` },
          { label: "Unidades" || "", path: `/construction/projects/${project?.id}/details?tab=units` },
          { label: unitResponse?.name || "", path: `/construction/projects/${project?.id}/units/${unitResponse?.id}` },
          { label: "Abono a inicial", path: "" }
        ]}
      />

      <PageTitle title="Abono a Inicial" subtitle={unitResponse?.name}/>

      <div className="max-w-md mx-auto mt-8">
        <div className="mb-4">
          <ClosableAlert closable={false} color="info">
            <p><strong>Monto Inicial: </strong> {Formatters.currency(unitResponse?.downPayment?.amount)}</p>
            <p><strong>Balance:</strong> {Formatters.currency(unitResponse?.downPayment?.balance)}</p>
          </ClosableAlert>
        </div>
        {error && <ClosableAlert closable={false} color="danger">{error}</ClosableAlert>}
        <CompoundForm
          sendingRequest={loading}
          onSubmit={downPaymentInstallment}
          title="Detalles de Pago"
          submitButtonText="Aplicar Abono"
          onCancel={() => navigate(-1)}
          alertDialogText="Confirmar"
          alertDialogDesc="¿Está seguro que desea cancelar esta operación?"
          alertAcceptButtonText="Si, estoy seguro"
          confirmCancel={true}
          inputs={[
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
          ]}
        />
      </div>
    </PageWrapper>
  );
}
