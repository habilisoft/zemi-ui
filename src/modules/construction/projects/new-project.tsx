import { CompoundForm } from "@/components/ui/compound-form";
import { z } from "zod";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export function NewProject() {
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
          sendingRequest={false}
          onSubmit={(data) => console.log(data)}
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
