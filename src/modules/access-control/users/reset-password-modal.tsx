import { Dialog } from '@/components/ui/dialog';
import { IUser } from '@/types';
import { UsersService } from '@/services/users.service.ts';
import { useState } from 'react';
import { CompoundForm } from '@/components/ui/compound-form.tsx';
import { passwordValidation } from '@/lib/validations.ts';
import { z } from 'zod';
import { randomPassword } from '@/lib/utils.ts';
import { Messages } from '@/lib/constants.tsx';
import ClosableAlert from '@/components/ui/closable-alert.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Label } from '@/components/ui/label.tsx';
import { CopyButton } from '@/components/copy-button/copy-button.tsx';

type Props = {
  open: boolean;
  onClose: () => void;
  user?: IUser | null;
}

function ResetPasswordModal({
                              open,
                              onClose,
                              user
                            }: Props) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [newPassword,setNewPassword] = useState<string | null>(null);
  const userService = new UsersService();

  function handleSubmit(data: Record<string, string | string[]>) {
    const password = data.passwordType === 'auto'
      ? randomPassword(8)
      : data.password as string;
    const changePasswordAtNextLogin = (data.changePasswordAtNextLogin as string[]).includes('changePasswordAtNextLogin');
    setSaving(true)
    userService.resetPassword({
      username: user?.username || '',
      password, changePasswordAtNextLogin
    })
      .then(() => {
        setSuccess(true);
        setNewPassword(password);
      })
      .catch(({ response }) => {
        setError(response?.data?.message || Messages.UNEXPECTED_ERROR);
      })
      .finally(() => {
        setSaving(false);
      });
  }

  return (<Dialog
    title="Restablecer contraseña"
    isOpen={open}
    close={onClose}
  >
    {error && <ClosableAlert closable={false} color="danger">{error}</ClosableAlert>}

    {!success &&
      <CompoundForm
        sendingRequest={saving}
        buttonPosition="right"
        onSubmit={handleSubmit}
        submitButtonText="Restablecer contraseña"
        cancelButtonText="Cancelar"
        onCancel={onClose}
        confirmCancel={false}
        inputs={[
          {
            label: "Contraseña",
            name: 'passwordType',
            type: 'radioGroup',
            defaultValue: 'auto',
            options: [
              { label: 'Generar automáticamente', value: 'auto' },
              { label: 'Ingresar nueva contraseña', value: 'manual' }
            ],
            validations: z.enum(["auto", "manual"], {
              required_error: "You need to select a option",
            }),
          },
          {
            label: 'Nueva contraseña',
            name: 'password',
            type: 'password',
            defaultValue: randomPassword(8),
            validations: passwordValidation,
            showIf: [{ field: 'passwordType', value: 'manual' }]
          },
          {
            label: "Opciones",
            name: 'changePasswordAtNextLogin',
            type: 'checkbox',
            defaultValue: [],
            options: [{
              label: 'Cambiar contraseña en el próximo inicio de sesión',
              value: "changePasswordAtNextLogin"
            }],
            validations: z.array(z.string())
          }
        ]}/>}

    {success &&
      <>
        <ClosableAlert color="success">Contraseña restablecida exitosamente</ClosableAlert>
        <div className="space-y-2">
          <div>
            <Label>Usuario</Label>
            <div className="flex items-center space-x-2">
              <CopyButton
                successMessage="Usuario copiado"
                content={user?.username}/>
              <span className="block text-gray-600">{user?.username}</span>
            </div>
          </div>
          <div>
            <Label>Nueva contraseña</Label>
            <div className="flex items-center space-x-2">
              <CopyButton
                successMessage="Contraseña copiada"
                content={newPassword || ""}/>
              <span className="block text-gray-600">{newPassword}</span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button
            variant="outline"
            onClick={() => {
              setSuccess(false);
              onClose();
            }}
          >
            Cerrar
          </Button>
        </div>
      </>}

  </Dialog>)
}

export { ResetPasswordModal }
