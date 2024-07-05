import { Dialog } from '@/components/ui/dialog.tsx';
import { AssignRoleToUserForm } from '@/modules/access-control';
import { IRole } from '@/types';

type Props = {
  open: boolean;
  onClose: () => void;
  role?: IRole
}

function AssignRoleToUsersModal({
                                  open,
                                  onClose,
                                  role
                                }: Props) {

  return (
    <Dialog
      title={<span>Asignar role <span className="underline decoration-dashed underline-offset-4">{role?.name}</span> a usuarios</span>}
      isOpen={open}
      close={onClose}
    >
      <AssignRoleToUserForm
        onSuccess={onClose}
        role={role}/>
    </Dialog>
  )
}

export { AssignRoleToUsersModal }
