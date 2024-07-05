import { Dialog } from '@/components/ui/dialog.tsx';
import { IUser } from '@/types';
import ClosableAlert from '@/components/ui/closable-alert.tsx';
import { cn } from '@/lib/utils.ts';
import { RemoteDataTable } from '@/components/ui/remote-data-table';
import { Button } from '@/components/ui/button.tsx';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { UsersService } from '@/services/users.service.ts';
import { toast } from 'sonner';
import { Messages } from '@/lib/constants.tsx';

type Props = {
  open: boolean;
  onClose: (success: boolean) => void;
  user: Partial<IUser>
}

function AssignRolesToUserModal({
                                  open,
                                  onClose,
                                  user
                                }: Props) {

  const [selectedRecords, setSelectedRecords] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const userService = new UsersService(user?.username);
  const [error, setError] = useState(false);

  function handleSelect(selected: string) {
    const index = selectedRecords.indexOf(selected);
    if (index > -1) {
      setSelectedRecords(selectedRecords.filter((record) => record !== selected));
    } else {
      setSelectedRecords([...selectedRecords, selected]);
    }
  }

  function handleClose() {
    onClose(false);
    setTimeout(() => {
      setSelectedRecords([]);
      setError(false);
    },300);
  }

  const assign = () => {
    setSaving(true);
    userService.assignRolesToUser(selectedRecords)
      .then(() => {
        setSaving(false);
        setSelectedRecords([]);
        toast.success(selectedRecords.length > 1 ?
          `Roles asignados al usuario`
          : `Rol asignado al usuario`);
        onClose(true)
      })
      .catch(({ response }) => {
        setSaving(false);
        setError(response?.data?.message || Messages.UNEXPECTED_ERROR);
      });
  }

  return (
    <Dialog
      title={<span>Asignar roles al usuario <span className="underline decoration-dashed underline-offset-4">{user?.name}</span></span>}
      isOpen={open}
      close={()=>{}}
    >
      <div>
        {error && <ClosableAlert color="danger">{error}</ClosableAlert>}
        {selectedRecords.length === 0 && (
          <ClosableAlert
            color="warning"
            className={cn("mb-4")}>
            Seleccione al menos un usuario
          </ClosableAlert>
        )
        }
        {selectedRecords.length > 0 && (
          <ClosableAlert
            color="success"
            className={cn("mb-4")}
          >
            Seleccionados: <strong>{selectedRecords.length}</strong>
          </ClosableAlert>
        )}
      </div>
      <RemoteDataTable
        path="/api/v1/roles"
        searchFields={["name"]}
        columns={[
          {
            header: "Nombre",
            field: "name"
          },
          {
            header: "Descripción",
            field: "description"
          }
        ]}
        gridChanged={false}
        style={{ height: "350px" }}
        filters={[]}
        idColumn="id"
        selected={selectedRecords}
        onSelect={handleSelect}
        defaultPageSize={30}/>

      <div className="flex justify-end gap-4">
        <Button
          onClick={handleClose}
          variant="outline"
          type="button"
          disabled={false}
        >
          Cancelar
        </Button>

        <Button
          type="submit"
          onClick={assign}
          disabled={saving || selectedRecords.length === 0}
        >
          {saving && (
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin"/>
          )}
          Asignar
        </Button>
      </div>
    </Dialog>
  )
}

export { AssignRolesToUserModal }
