import { useState } from 'react';
import { CompoundForm } from '@/components/ui/compound-form.tsx';
import { ICreateUserRequest, IUserCreated } from '@/types';
import { z } from 'zod';
import { Button } from '@/components/ui/button.tsx';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Messages } from '@/lib/constants.tsx';
import ClosableAlert from '@/components/ui/closable-alert.tsx';
import { RemoteDataTable } from '@/components/ui/remote-data-table';
import { UsersService } from '@/services/users.service.ts';
import { passwordValidation } from '@/lib/validations.ts';
import { cn, randomPassword } from '@/lib/utils.ts';

type Props = {
  selectedRoles: string[];
  onSuccess: (request: IUserCreated) => void
}

function UserForm({ selectedRoles: roles = [], onSuccess }: Props) {
  const [selectedRoles, setSelectedRoles] = useState<string[]>(roles);
  const [step, setStep] = useState(1);
  const [user, setUser] = useState({} as ICreateUserRequest);
  const userService = new UsersService();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  function handleFirstStep(data: Record<string, string | string[]>) {
    const userData = {
      name: data.name as string,
      username: data.username as string,
      password: data.passwordType === 'auto'
        ? randomPassword(8)
        : data.password as string,
      changePasswordAtNextLogin: data.options.includes("changePasswordAtNextLogin"),
      roles: []
    }

    setUser(userData);
    setStep(2);
  }

  function onSelect(permission: string) {
    const index = selectedRoles?.indexOf(permission);
    if (index === -1) {
      setSelectedRoles([...selectedRoles, permission]);
    } else {
      setSelectedRoles(selectedRoles?.filter((p: string) => p !== permission));
    }
  }

  function createUser() {
    setSaving(true);
    const request = { ...user, roles: selectedRoles };
    userService.createUser(request)
      .then(( userCreated ) => {
        setSaving(false);
        toast.success("Usuario creado exitosamente");
        onSuccess({...userCreated, password: user.password});
      })
      .catch(({ response }) => {
        setError(response?.data?.message || Messages.UNEXPECTED_ERROR);
        setSaving(false);
      });
  }

  return (
    <div>
      {error && (<ClosableAlert color="danger">{error}</ClosableAlert>)}
      {step == 1 && (
        <div className="max-w-md">
          <CompoundForm
            title="Datos Generales"
            sendingRequest={false}
            onSubmit={handleFirstStep}
            cancelButtonText="Cancelar"
            confirmCancel={true}
            alertAcceptButtonText="Si, estoy seguro"
            alertCancelButtonText="No, cancelar"
            submitButtonText="Siguiente"
            inputs={[
              {
                label: "Nombre",
                name: "name",
                defaultValue: user.name,
                type: "text",
                helpText: "El nombre de la persona. Ejemplo: Juan Pérez",
                validations: z.string({ message: "El nombre es requerido" })
                  .min(3, "El nombre debe tener al menos 3 caracteres")
                  .max(50, "El nombre no puede tener más de 50 caracteres")
              },
              {
                label: "Usuario",
                name: "username",
                type: "text",
                helpText: "El nombre del usuario que se usará para iniciar sesión, sin espacios. Ejemplo: juanperez",
                defaultValue: user.username,
                validations: z.string({ message: "El usuario es requerido" })
                  .min(3, "El usuario debe tener al menos 3 caracteres")
                  .max(50, "El usuario no puede tener más de 50 caracteres")
                  .regex(/^[a-zA-Z0-9]+$/, "El usuario solo puede contener letras y números")
              },
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
                label: 'Contraseña',
                name: 'password',
                type: 'password',
                defaultValue: randomPassword(8),
                validations: passwordValidation,
                showIf: [{ field: 'passwordType', value: 'manual' }]
              },
              {
                label: "Opciones",
                name: 'options',
                type: 'checkbox',
                defaultValue: [],
                options: [{
                  label: 'Cambiar contraseña en el próximo inicio de sesión',
                  value: "changePasswordAtNextLogin"
                }],
                validations: z.array(z.string())
              }
            ]}/>
        </div>
      )
      }

      {step == 2 &&
        <div>
          <h2 className="text-base font-bold leading-7 text-neutral-900">Roles</h2>
          { selectedRoles.length === 0 && (
            <ClosableAlert
              color="warning"
              className={cn("mb-2")}>
              Seleccione al menos un rol para asignar al usuario
            </ClosableAlert>
          )
          }
          {selectedRoles.length > 0 && (
            <ClosableAlert
              color="success"
              className={cn("mb-2")}
            >
              Seleccionados: <strong>{selectedRoles.length}</strong>
            </ClosableAlert>
          )}
          <div className="gap-6 grid grid-cols-1 mt-2">
            <RemoteDataTable
              path="/api/v1/roles"
              columns={[
                { header: "Nombre", field: "name" },
                { header: "Descripción", field: "description" },
              ]}
              gridChanged={false}
              style={{height: "300px"}}
              selected={selectedRoles}
              onSelect={onSelect}
              defaultPageSize={25}/>
            <div className="flex items-center gap-4">
              <Button
                disabled={saving}
                onClick={() => setStep(1)} variant="secondary">
                Atrás
              </Button>
              <Button
                onClick={createUser}
                disabled={saving || selectedRoles.length === 0}>
                {saving && (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin"/>
                )}
                Crea Usuario
              </Button>
            </div>
          </div>

        </div>
      }
    </div>
  )
}

export { UserForm }
