import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import PageTitle from '@/components/ui/page-title.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Column, RemoteDataTable } from '@/components/ui/remote-data-table';
import { IUser } from '@/types';
import { UserRolesCell } from '@/modules/access-control/components';
import { PageWrapper } from '@/components/ui/page-wrapper.tsx';
import { UserRowActions } from '@/modules/access-control/users/user-row-actions.tsx';
import { ResetPasswordModal } from '@/modules/access-control';
import { useMemo, useState } from 'react';
import { DeleteUserModal } from '@/modules/access-control/users/delete-user-modal.tsx';

function ListUsers() {
  const [resetPasswordModalOpen, setResetPasswordModalOpen] = useState(false);
  const [removeUserModalOpen, setRemoveUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const columns: Column[] = useMemo(() => [
    {
      header: "Usuario",
      field: "username",
      render: (_cell, row: IUser) => <Link
        className="link"
        to={`/access-control/users/${row.username}/details`}>{row.username}</Link>
    },
    {
      header: "Nombre",
      field: "name",
    },
    {
      header: "Roles",
      field: "roles",
      render: (_cell, user: IUser) => <UserRolesCell user={user}/>
    },
    {
      header: "",
      field: "username",
      render: (_cell, user: IUser) => <UserRowActions
        user={user}
        handleRemoveUser={() => handleRemoveUser(user)}
        handleResetPassword={() => handleResetPassword(user)}/>
    }
  ], []);

  function handleResetPassword(user: IUser) {
    setResetPasswordModalOpen(true);
    setSelectedUser(user);
  }

  function handleRemoveUser(user: IUser) {
    setRemoveUserModalOpen(true);
    setSelectedUser(user);
  }

  return (
    <>
      <DeleteUserModal
        open={removeUserModalOpen}
        user={selectedUser}
        onClose={() => setRemoveUserModalOpen(false)}/>
      <ResetPasswordModal
        open={resetPasswordModalOpen}
        user={selectedUser}
        onClose={() => setResetPasswordModalOpen(false)}/>
      <PageWrapper>
        <Breadcrumb
          items={[
            { label: "Usuarios y Permisos", path: "/access-control" },
            { label: "Usuarios", path: "/access-control" },
          ]}
        />
        <div className="flex items-center justify-between space-y-2">
          <PageTitle title="Usuarios" subtitle="Usuarios y Permisos"/>
          <Button asChild>
            <Link to="users/new">
              <Plus className="size-4 mr-2"/> Nuevo Usuario
            </Link>
          </Button>
        </div>
        <RemoteDataTable
          path="/api/v1/users"
          columns={columns}
          placeholder="Buscar por nombre"
          gridChanged={false}
          reload={false}
          filters={[]}
          style={{ height: "calc(100vh - 350px)" }}
          searchFields={["name"]}
          defaultPageSize={25}/>
      </PageWrapper>
    </>
  );
}

export { ListUsers }
