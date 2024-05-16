import { Bolt } from "lucide-react";
import { CompoundForm } from "@/components/ui/compound-form";
import { z } from "zod";

export default function AuthPage() {
  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
        <Bolt className="text-amber-500 inline-block" size={40} />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-neutral-900">
          Inicio de sesión
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <CompoundForm
          inputs={[
            {
              label: "Email",
              name: "email",
              defaultValue: "",
              type: "text",
              placeholder: "",
              validations: z.string().email({ message: "Email inválido" }),
            },
            {
              label: "Contraseña",
              name: "password",
              defaultValue: "",
              type: "password",
              placeholder: "",
              validations: z
                .string({ required_error: "Campo requerido" })
                .min(6, { message: "Mínimo 6 caracteres" }),
            },
          ]}
          sendingRequest={false}
          submitButtonText="Iniciar sesión"
          onSubmit={(data) => console.log(JSON.stringify(data, null, 2))}
        />
      </div>
    </div>
  );
}
