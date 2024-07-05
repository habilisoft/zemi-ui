import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import PageTitle from '@/components/ui/page-title.tsx';
import { CompoundForm } from '@/components/ui/compound-form.tsx';
import { useState } from 'react';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { UsersService } from '@/services/users.service.ts';
import { toast } from 'sonner';
import { Messages } from '@/lib/constants.tsx';
import ClosableAlert from '@/components/ui/closable-alert.tsx';
import { PageWrapper } from '@/components/ui/page-wrapper.tsx';
import { passwordValidation } from '@/lib/validations.ts';
import { useCompoundStore } from '@/stores/compound-store.ts';

export function ChangePassword() {
  const [sendingRequest, setSendingRequest] = useState(false);
  const navigate = useNavigate();
  const usersService = new UsersService();
  const [error, setError] = useState<string | null>(null);
  const { updateAuthUserProperty } = useCompoundStore(
    (state) => ({
      updateAuthUserProperty: state.updateAuthUserProperty,
    })
  );
  const onSubmit = (data: Record<string, string | string []>) => {
    setSendingRequest(true);
    usersService.changePassword({
      currentPassword: data.currentPassword as string,
      newPassword: data.newPassword as string,
    }).then(() => {
      navigate("/user-settings");
      toast.success("Contraseña cambiada exitosamente");
      updateAuthUserProperty("changePasswordAtNextLogin", false);
    }).catch(({ response }) => {
      setError(response?.data?.message || Messages.UNEXPECTED_ERROR)
    }).finally(() => setSendingRequest(false));
  }
  return (
    <PageWrapper>
      <Breadcrumb
        items={[
          { label: "Ajustes de Usuario", path: "/user-settings" },
          { label: "Cambiar Contraseña", path: "/user-settings/change-password" },
        ]}
      />
      <div className="flex items-center justify-between space-y-2">
        <PageTitle title="Cambiar Contraseña" subtitle="Ajustes de Usuario"/>
      </div>
      <div className="max-w-md mx-auto mt-8 space-y-4">
        {error && <ClosableAlert closable={false} color="danger">{error}</ClosableAlert>}
        <CompoundForm
          sendingRequest={sendingRequest}
          submitButtonText="Cambiar Contraseña"
          onCancel={() => navigate("/user-settings")}
          confirmCancel={false}
          onSubmit={onSubmit}
          inputs={[
            {
              type: "password",
              name: "currentPassword",
              label: "Contraseña actual",
              defaultValue: "",
              validations: passwordValidation
            },
            {
              type: "password",
              name: "newPassword",
              label: "Nueva contraseña",
              defaultValue: "",
              validations: passwordValidation,
            },
            {
              type: "password",
              name: "confirmPassword",
              label: "Confirmar contraseña",
              defaultValue: "",
              validations: z
                .string({ required_error: "Campo requerido" })
                .min(6, { message: "Mínimo 6 caracteres" }),
            },
          ]}/>

      </div>
    </PageWrapper>
  );
}
