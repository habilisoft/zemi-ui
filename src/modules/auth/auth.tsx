import { AlertCircle, Bolt } from "lucide-react";
import { CompoundForm } from "@/components/ui/compound-form";
import { z } from "zod";
import { useContext, useState } from 'react';
import { LoginRequest } from '@/types';
import { AuthContext } from '@/context/auth-context';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertTitle } from '@/components/ui/alert.tsx';

export default function AuthPage() {
  const [loading, setLoading] = useState(false)
  const { login } = useContext(AuthContext);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = (data: Record<string, string>) => {
    setLoading(true);
    setError(null);
    const request: LoginRequest = {
      username: data.username,
      password: data.password
    }
    login(request).then(() => {
      setLoading(false)
      navigate('/')
    }).catch(({response}) => {
      setError(response.data.message)
      setLoading(false)
    });
  }
  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
        <Bolt className="text-amber-500 inline-block" size={40} />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-neutral-900">
          Inicio de sesión
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {error && <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{error}</AlertTitle>
        </Alert>}
        <CompoundForm
          inputs={[
            {
              label: "Usuario",
              name: "username",
              defaultValue: "",
              type: "text",
              placeholder: "",
              validations: z.string({ required_error: "Campo requerido" }),
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
          sendingRequest={loading}
          submitButtonText="Iniciar sesión"
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}
