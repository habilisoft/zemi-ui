import { IUser } from '@/types';
import { AlertDialog } from '@/components/ui/alert-dialog';
import { useState } from 'react';
import { Messages } from '@/lib/constants';
import ClosableAlert from '@/components/ui/closable-alert';
import { UsersService } from '@/services/users.service.ts';

type Props = {
  open: boolean;
  onClose: (success: boolean) => void;
  selectedRoles: string[],
  user?: Partial<IUser>
}

function RemoveRoleFromUserModal({
                                   open,
                                   onClose,
                                   selectedRoles,
                                   user
                                 }: Props) {
  const userService = new UsersService(user?.username);
  const [error, setError] = useState(false);

  function handleDelete() {
    userService.removeRolesFromUser(selectedRoles)
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
        <span>{`¿Estás seguro que desea quitar ${selectedRoles.length > 1 ? 'los roles seleccionados':'el rol seleccionado'}`}
        </span> del usuario <span
          className="underline underline-offset-4 decoration-dashed">{user?.name}</span>?
      </div>}
      acceptButtonText="Eliminar"
      cancelButtonText="Cancelar"
    />
  )
}

export { RemoveRoleFromUserModal }
