import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import PageTitle from '@/components/ui/page-title.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Column } from '@/components/ui/remote-data-table';
import { IProject, IRole } from '@/types';
import { PageWrapper } from '@/components/ui/page-wrapper.tsx';
import { RoleRowActions } from '@/modules/access-control/roles/role-row-actions.tsx';
import { AssignRoleToUsersModal } from '@/modules/access-control';
import { useMemo, useState } from 'react';
import { DeleteRoleModal } from '@/modules/access-control/roles/delete-role-modal.tsx';
import { GraphQLRemoteDataTable } from '@/components/ui/graphql-remote-data-table';
import { GET_ROLES } from '@/queries.ts';

function ListRoles() {
  const [showAssignRoleToUsersModal, setShowAssignRoleToUsersModal] = useState(false);
  const [showDeleteRoleModal, setShowDeleteRoleModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<IRole>();

  function onAssignToUser(role: IRole) {
    setSelectedRole(role);
    setShowAssignRoleToUsersModal(true);
  }

  function deleteRole(role: IRole) {
    setSelectedRole(role);
    setShowDeleteRoleModal(true);
  }

  const columns: Column[] = useMemo(() => ([
    {
      "header": "Nombre",
      "field": "name",
      "render": (_cell, row: IProject) => <Link className="link"
                                                to={`/access-control/roles/${row.name}/details`}>{row.name}</Link>
    },
    {
      "header": "Descripción",
      "field": "description",
    },
    {
      "header": "",
      "field": "id",
      "render": (_cell, role: IRole) => <RoleRowActions
        deleteRole={() => deleteRole(role)}
        onAssignToUsers={() => onAssignToUser(role)}
        role={role}/>
    }
  ]), []);
  return (
    <>
      <AssignRoleToUsersModal
        role={selectedRole}
        onClose={() => setShowAssignRoleToUsersModal(false)}
        open={showAssignRoleToUsersModal}/>
      <DeleteRoleModal
        open={showDeleteRoleModal}
        role={selectedRole}
        onClose={() => setShowDeleteRoleModal(false)}/>
      <PageWrapper>
        <Breadcrumb
          items={[
            { label: "Usuarios y Permisos", path: "/access-control" },
            { label: "Roles", path: "/access-control/roles" },
          ]}
        />
        <div className="flex items-center justify-between space-y-2">
          <PageTitle title="Roles" subtitle="Usuarios y Permisos"/>
          <Button asChild>
            <Link to="new">
              <Plus className="size-4 mr-2"/> Nuevo Role
            </Link>
          </Button>
        </div>
        <GraphQLRemoteDataTable
          query={GET_ROLES}
          collectionName="roles"
          columns={columns}
          placeholder="Buscar por nombre"
          gridChanged={false}
          reload={false}
          style={{ height: "calc(100vh - 350px)" }}
          defaultPageSize={25}/>
      </PageWrapper>
    </>
  );
}

export { ListRoles }
