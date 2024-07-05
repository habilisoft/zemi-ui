import { IRole } from '@/types';
import { RolesService } from '@/services/roles.service';
import { AlertDialog } from '@/components/ui/alert-dialog';
import { useState } from 'react';
import { Messages } from '@/lib/constants';
import ClosableAlert from '@/components/ui/closable-alert';

type Props = {
  open: boolean;
  onClose: () => void;
  role?: IRole
}

function DeleteRoleModal({
                           open,
                           onClose,
                           role
                         }: Props) {
  const roleService = new RolesService(role?.id);
  const [error, setError] = useState(false);

  function handleDelete() {
    roleService.deleteRole()
      .then(() => {
        onClose();
      })
      .catch(({ response }) => {
        setError(response?.data?.message || Messages.UNEXPECTED_ERROR)
      });
  }

  function handleClose() {
    onClose();
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
        <span>¿Estás seguro de eliminar el rol <span className="underline underline-offset-4 decoration-dashed">{role?.name}</span>?</span>
      </div>}
      acceptButtonText="Eliminar"
      cancelButtonText="Cancelar"
    />
  )
}

export { DeleteRoleModal }
