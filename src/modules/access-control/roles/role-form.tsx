import { SimpleDataTable } from '@/components/ui/simple-data-table';
import { usePermissions } from '@/hooks/permissions';
import { useState } from 'react';
import { CompoundForm } from '@/components/ui/compound-form.tsx';
import { IRole } from '@/types';
import { z } from 'zod';
import { Button } from '@/components/ui/button.tsx';
import { RolesService } from '@/services/roles.service.ts';
import { LoaderCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Messages } from '@/lib/constants.tsx';
import ClosableAlert from '@/components/ui/closable-alert.tsx';

type Props = {
  selectedPermissions: string[];
}

function RoleForm({ selectedPermissions: perms = [] }: Props) {
  const { permissions } = usePermissions("");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(perms);
  const [step, setStep] = useState(1);
  const [role, setRole] = useState({} as IRole);
  const roleService = new RolesService();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  function handleFirstStep(data: Record<string, string | string[]>) {
    setRole({ ...role, ...data });
    setStep(2);
  }

  function createRole() {
    setSaving(true);
    roleService.createRole({ ...role, permissions: selectedPermissions })
      .then(() => {
        setSaving(false);
        toast.success("Rol creado exitosamente");
        navigate("/access-control/roles");
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
                defaultValue: role.name,
                type: "text",
                validations: z.string({ message: "El nombre es requerido" })
                  .min(3, "El nombre debe tener al menos 3 caracteres")
                  .max(50, "El nombre no puede tener más de 50 caracteres")
              },
              {
                label: "Descripción",
                name: "description",
                type: "textarea",
                defaultValue: role.description,
                validations: z.string({ message: "La descripción es requerida" })
                  .min(3, "La descripción debe tener al menos 3 caracteres")
                  .max(255, "La descripción no puede tener más de 255 caracteres")
              }
            ]}/>
        </div>
      )
      }

      {step == 2 &&
        <div>
          <h2 className="text-base font-bold leading-7 text-neutral-900">Permisos</h2>
          <div className="gap-6 grid grid-cols-1 mt-6">
            <SimpleDataTable
              columns={[
                { header: "Nombre", field: "name" },
                { header: "Descripción", field: "description" },
                { header: "Módulo", field: "module" }
              ]}
              setSelectedRecords={setSelectedPermissions}
              selectedRecords={selectedPermissions}
              style={{height: "300px"}}
              records={permissions || []}/>

            <div className="flex items-center gap-4">
              <Button
                disabled={saving}
                onClick={() => setStep(1)} variant="secondary">
                Atrás
              </Button>
              <Button
                onClick={createRole}
                disabled={saving || selectedPermissions.length === 0}>
                {saving && (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin"/>
                )}
                Crea Rol
              </Button>
            </div>
          </div>

        </div>
      }
    </div>
  )
}

export { RoleForm }
