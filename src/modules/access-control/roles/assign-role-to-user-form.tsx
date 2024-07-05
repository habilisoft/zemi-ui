import { Column, RemoteDataTable } from '@/components/ui/remote-data-table';
import { useState } from 'react';
import { PageWrapper } from '@/components/ui/page-wrapper.tsx';
import { IRole } from '@/types';
import { Button } from '@/components/ui/button.tsx';
import { cn } from '@/lib/utils.ts';
import { LoaderCircle } from 'lucide-react';
import ClosableAlert from '@/components/ui/closable-alert.tsx';
import { RolesService } from '@/services/roles.service.ts';
import { Messages } from '@/lib/constants.tsx';
import { toast } from 'sonner';

interface Props {
  role?: IRole;
  onSuccess: () => void;
}

const columns: Column[] = [
  {
    "header": "Usuario",
    "field": "username",
  },
  {
    "header": "Nombre",
    "field": "name",
  }
]

function AssignRoleToUserForm( { role, onSuccess }: Props) {
  const [selectedRecords, setSelectedRecords] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const roleService = new RolesService(role?.id);
  const [error, setError] = useState(false);

  function handleSelect(selected: string) {
    const index = selectedRecords.indexOf(selected);
    if (index > -1) {
      setSelectedRecords(selectedRecords.filter((record) => record !== selected));
    } else {
      setSelectedRecords([...selectedRecords, selected]);
    }
  }

  const assign = () => {
    setSaving(true);
    roleService.assignRoleToUsers(selectedRecords)
      .then(() => {
        setSaving(false);
        setSelectedRecords([]);
        toast.success(`Rol ${role?.name} ha sido asignado a ${selectedRecords.length} usuario${selectedRecords.length>1 ? "s" : ""}`);
        onSuccess();
      })
      .catch(({response}) => {
        setSaving(false);
        setError(response?.data?.message || Messages.UNEXPECTED_ERROR);
      });
  }

  return (
    <PageWrapper>
      <div>
        {error && <ClosableAlert color="danger">{error}</ClosableAlert>}
        { selectedRecords.length === 0 && (
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
        path="/api/v1/users"
        searchFields={["username", "name"]}
        columns={columns}
        gridChanged={false}
        style={{ height: "350px" }}
        filters={[]}
        idColumn="username"
        selected={selectedRecords}
        onSelect={handleSelect}
        defaultPageSize={30}/>

      <div className="flex justify-end gap-4">
          <Button
            onClick={onSuccess}
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
    </PageWrapper>
  )

}

export { AssignRoleToUserForm };
