import { IRole } from '@/types';
import { AlertDialog } from '@/components/ui/alert-dialog';
import { useState } from 'react';
import { Messages } from '@/lib/constants';
import ClosableAlert from '@/components/ui/closable-alert';
import { RolesService } from '@/services/roles.service.ts';

type Props = {
  open: boolean;
  onClose: (success: boolean) => void;
  selectedPermissions: string[],
  role?: Partial<IRole>
}

function RemovePermissionFromRole({
                                   open,
                                   onClose,
                                   selectedPermissions,
                                   role
                                 }: Props) {
  const roleService = new RolesService(role?.id);
  const [error, setError] = useState(false);

  function handleDelete() {
    roleService.removePermissions(selectedPermissions)
      .then(() => {
        onClose(true);
      })
      .catch(({ response }) => {
        setError(response?.data?.message || Messages.UNEXPECTED_ERROR)
      });
  }

  function handleClose() {
    onClose(false);
    setTimeout(() => {
      setError(false);
    },300);
  }

  return (
    <AlertDialog
      isOpen={open}
      cancel={handleClose}
      action={handleDelete}
      title="Confirmar"
      description={<div>
        {error && <div className="mb-4">
          <ClosableAlert color="danger">
            {error}
          </ClosableAlert>
        </div>}
        <span>{`¿Estás seguro que desea quitar ${selectedPermissions.length > 1 ? 'los permisos seleccionados':'el permiso seleccionado'}`}
        </span> del rol <span
          className="underline underline-offset-4 decoration-dashed">{role?.name}</span>?
      </div>}
      acceptButtonText="Eliminar"
      cancelButtonText="Cancelar"
    />
  )
}

export { RemovePermissionFromRole }
