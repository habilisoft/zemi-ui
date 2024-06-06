import { CompoundForm } from "@/components/ui/compound-form";
import { z } from "zod";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ProjectsService } from '@/services/projects.service.ts';
import { useState } from 'react';
import { IProject } from '@/types';
import { useNavigate } from 'react-router-dom';

export function NewProject() {
  const [loading, setLoading] = useState(false)
  const projectsService = new ProjectsService();
  const navigate = useNavigate();

  const handleSubmit = (data: Record<string, string | string []>) => {
    setLoading(true);
    console.log(data);
    const projectData: IProject = {
      name: data.name as string,
      value: {
        currency: data.currency as string,
        value: parseFloat(data.unitPrice as string),
      },
      downPaymentInformation: {
        downPaymentAmount: {
          type: "percentage",
          value: {
            currency: data.currency as string,
            value: parseFloat(data.unitPrice as string),
          },
        },
        downPaymentPaymentMethod: {
          monthsToComplete: parseInt(data.monthsToComplete as string),
          type: data.initialType as "percentage" | "upfront",
          percentage: parseInt(data.initialPercentage as string),
          reservationAmount: {
            currency: data.currency as string,
            value: parseFloat(data.unitPrice as string),
          },
        },
        }
      }

    const unitsToAdd = parseInt(data.qty as string);

    projectsService.createProject(projectData)
      .then((data: IProject) => {
        setLoading(false);
        if(unitsToAdd === 0) {
          navigate(`/construction/projects/${data.id}/details`);
        } else {
          navigate(`/construction/projects/${data.id}/add-units`, { state: { project: data, unitsToAdd } });
        }
      }).catch((error) => {
      console.error(error);
      setLoading(false);
    });
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
      <div className="max-w-md mx-auto mt-8">
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
              type: "number",
              label: "Precio por unidad",
              name: "unitPrice",
              defaultValue: 0,
              validations: z.coerce
                .number()
                .min(1, { message: "Debe ser mayor a 0" })
            },
            {
              label: "Moneda",
              name: "currency",
              defaultValue: "USD",
              type: "select",
              options: [
                { label: "USD (Dólares)", value: "USD" },
                { label: "DOP (Pesos Dominicanos)", value: "DOP" }
              ],
              validations: z.string(),
            },
            {
              type: "number",
              label: "Porcentaje Inicial",
              addOn: "%",
              name: "initialPercentage",
              defaultValue: 0,
              validations: z.coerce
                .number()
                .min(1, { message: "Debe ser mayor a 0" })
                .max(100, { message: "Debe ser menor a 100" }),
            },
            {
              type: "radioGroup",
              label: "Pago de inicial",
              options: [
                { label: "Porcentage de precio de la unidad", value: "percentage" },
                { label: "Monto Fijo", value: "upfront" },
              ],
              name: "initialType",
              defaultValue: "percentage",
              validations: z.string(),
            },
            {
              type: "number",
              label: "Meses para completar el inicial",
              name: "monthsToComplete",
              defaultValue: 0,
              validations: z.coerce
                .number()
                .min(1, { message: "Debe ser mayor a 0" })
            },
            {
              label: "Cantidad de Unidades",
              name: "qty",
              defaultValue: 0,
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
