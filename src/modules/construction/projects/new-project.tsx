import { CompoundForm } from "@/components/ui/compound-form";
import { z } from "zod";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ProjectsService } from '@/services/projects.service.ts';
import { useState } from 'react';
import { IDownPaymentInformation, IProject, IProjectRequest, Money } from '@/types';
import { useNavigate } from 'react-router-dom';
import { Messages } from '@/lib/constants.tsx';
import ClosableAlert from '@/components/ui/closable-alert.tsx';

export function NewProject() {
  const [loading, setLoading] = useState(false)
  const projectsService = new ProjectsService();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (data: Record<string, string | string [] | Money>) => {
    setLoading(true);
    const projectData: IProjectRequest = getProjectData(data);
    const unitsToAdd = parseInt(data.qty as string);
    projectsService.createProject(projectData)
      .then((data: IProject) => {
        setLoading(false);
        if (unitsToAdd === 0) {
          navigate(`/construction/projects/${data.id}/details`);
        } else {
          navigate(`/construction/projects/${data.id}/add-units`, { state: { project: data, unitsToAdd } });
        }
      }).catch(({ response }) => {
      setError(response?.data?.message || Messages.UNEXPECTED_ERROR);
    }).finally(() => setLoading(false));
  }

  const getProjectData = (data: Record<string, string | string [] | Money>) => {
    const projectData = {
      name: data.name as string,
      pricePerUnit: data.unitPrice as Money,
      downPaymentInformation: {} as IDownPaymentInformation
    }

    switch (data.downPaymentAmountType) {
      case "percentage":
        projectData.downPaymentInformation.amount = {
          type: "percentage",
          percentage: parseFloat(data.downPaymentAmountPercentage as string),
        }
        break;
      case "amount":
        projectData.downPaymentInformation.amount = {
          type: "amount",
          amount: data.downPaymentAmountValue as Money,
        }
        break;
    }
    //temp
    data.downPaymentPaymentMethod = "reservation";
    switch (data.downPaymentPaymentMethod) {
      case "reservation":
        projectData.downPaymentInformation.paymentMethod = {
          type: "reservation",
          amount: data.reservationAmount as Money,
          monthsToComplete: parseInt(data.monthsToComplete as string),
        }
        break;
      case "upfront":
        projectData.downPaymentInformation.paymentMethod = {
          type: "upfront"
        };
    }
    return projectData;
  }

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Constructora", path: "/construction" },
          { label: "Proyectos", path: "/construction/projects" },
          { label: "Nuevo Proyecto", path: "/construction/projects/new" },
        ]}
      />
      <div className="max-w-md mx-auto mt-8 space-x-4">
        {error && <ClosableAlert closable={false} color="danger">{error}</ClosableAlert>}
        <CompoundForm
          title="Nuevo Proyecto"
          sendingRequest={loading}
          onSubmit={handleSubmit}
          submitButtonText="Crear Proyecto"
          alertDialogText="Confirmar"
          alertDialogDesc="¿Estás seguro de cancelar la creación del proyecto?"
          onCancel={() => navigate("/construction/projects")}
          inputs={[
            {
              label: "Nombre",
              name: "name",
              defaultValue: "",
              type: "text",
              placeholder: "",
              validations: z.string().min(2, {
                message: "Nombre debe tener como mínimo 2 caracteres.",
              }),
            },
            {
              type: "money",
              label: "Precio por unidad",
              helpText: "Precio de venta de cada unidad. Puede cambiarlo luego para cada unidad.",
              name: "unitPrice",
              defaultValue: { value: 1, currency: "USD" },
              validations: z.object({
                currency: z.string(),
                value: z.number().min(1, { message: "Debe ser mayor a 0" })
              }).refine(({ value }) => value > 0, { message: "Debe ser mayor a 0" }),
            },
            {
              type: "radioGroup",
              label: "Tipo de Inicial",
              options: [
                { label: "Porcentaje del valor total", value: "percentage" },
                { label: "Monto fijo", value: "amount" },
              ],
              name: "downPaymentAmountType",
              defaultValue: "percentage",
              validations: z.string(),
            },
            {
              type: "number",
              label: "Porcentaje Inicial",
              addOn: "%",
              name: "downPaymentAmountPercentage",
              helpText: "Porcentaje del valor total de la unidad a pagar como inicial.",
              showIf: [{ field: "downPaymentAmountType", value: "percentage" }],
              defaultValue: 1,
              validations: z.coerce
                .number()
                .min(1, { message: "Debe ser mayor a 0" })
                .max(100, { message: "Debe ser menor a 100" }),
            },
            {
              type: "money",
              label: "Monto Inicial",
              helpText: "Monto fijo a pagar como inicial",
              name: "downPaymentAmountValue",
              showIf: [{ field: "downPaymentAmountType", value: "amount" }],
              defaultValue: { value: 1, currency: "USD" },
              validations: z.object({
                currency: z.string(),
                value: z.number().min(1, { message: "Debe ser mayor a 0" })
              }).refine(({ value }) => value > 0, { message: "Debe ser mayor a 0" }),
            },
            {
              type: "radioGroup",
              label: "Pago de Inicial",
              options: [
                { label: "Separación", value: "reservation" },
                { label: "Pago por adelantado", value: "upfront" },
              ],
              name: "downPaymentPaymentMethod",
              defaultValue: "reservation",
              validations: z.string(),
            },
            {
              type: "money",
              label: "Monto Separación",
              helpText: "Monto a pagar para separar la unidad.",
              name: "reservationAmount",
              showIf: [{ field: "downPaymentPaymentMethod", value: "reservation" }],
              defaultValue: { value: 1, currency: "USD" },
              validations: z.object({
                currency: z.string(),
                value: z.number().min(1, { message: "Debe ser mayor a 0" })
              }).refine(({ value }) => value > 0, { message: "Debe ser mayor a 0" }),
            },
            {
              type: "number",
              label: "Meses para completar el inicial",
              showIf: [{ field: "downPaymentPaymentMethod", value: "reservation" }],
              name: "monthsToComplete",
              defaultValue: 1,
              validations: z.coerce
                .number()
                .min(1, { message: "Debe ser mayor a 0" })
            },
            {
              label: "Cantidad de Unidades",
              helpText: "Cantidad de unidades a crear inicialmente. Puede crear más unidades luego.",
              name: "qty",
              defaultValue: 1,
              type: "number",
              placeholder: "",
              validations: z.coerce
                .number()
                .gt(0, { message: "Debe ser mayor a 0" }),
            },
          ]}
        />
      </div>
    </>
  );
}
