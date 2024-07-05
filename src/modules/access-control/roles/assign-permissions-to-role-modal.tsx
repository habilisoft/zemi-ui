import { Dialog } from '@/components/ui/dialog.tsx';
import { IRole } from '@/types';
import ClosableAlert from '@/components/ui/closable-alert.tsx';
import { cn } from '@/lib/utils.ts';
import { Button } from '@/components/ui/button.tsx';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Messages } from '@/lib/constants.tsx';
import { RolesService } from '@/services/roles.service.ts';
import { usePermissions } from '@/hooks/permissions';
import { SimpleDataTable } from '@/components/ui/simple-data-table';
import { ModuleBadge } from '@/components/module-badge/module-badge.tsx';

type Props = {
  open: boolean;
  onClose: (success: boolean) => void;
  role: Partial<IRole>
}

function AssignPermissionsToRoleModal({
                                  open,
                                  onClose,
                                  role
                                }: Props) {

  const [selectedRecords, setSelectedRecords] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const roleService = new RolesService(role.id);
  const [error, setError] = useState(false);
  const { permissions } = usePermissions("");

  function handleClose() {
    onClose(false);
    setTimeout(() => {
      setSelectedRecords([]);
      setError(false);
    },300);
  }

  const assign = () => {
    setSaving(true);
    roleService.assignPermissions(selectedRecords)
      .then(() => {
        setSaving(false);
        setSelectedRecords([]);
        toast.success(selectedRecords.length > 1 ?
          `Permisos asignados al rol`
          : `Permiso asignado al rol`);
        onClose(true)
      })
      .catch(({ response }) => {
        setSaving(false);
        setError(response?.data?.message || Messages.UNEXPECTED_ERROR);
      });
  }

  return (
    <Dialog
      title={<span>Asignar permisos al rol <span className="underline decoration-dashed underline-offset-4">{role.name}</span></span>}
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

      <SimpleDataTable
        columns={[
          { header: "Permiso", field: "name" },
          { header: "Módulo", field: "module", render: (cell: string)=> <ModuleBadge module={cell}/>}
        ]}
        selectedRecords={selectedRecords}
        setSelectedRecords={setSelectedRecords}
        style={{height: "300px"}}
        records={permissions || []}/>

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

export { AssignPermissionsToRoleModal }
