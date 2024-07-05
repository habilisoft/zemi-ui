import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import PageTitle from '@/components/ui/page-title.tsx';
import { Link, useParams } from 'react-router-dom';
import { TabWrapper } from '@/components/tab-wrapper';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import { UsersService } from '@/services/users.service';
import { useEffect, useState } from 'react';
import { IRole, IUser } from '@/types';
import { FactRow } from '@/components/ui/fact-row.tsx';
import { SimpleDataTable } from '@/components/ui/simple-data-table';
import { PageWrapper } from '@/components/ui/page-wrapper.tsx';
import { Button } from '@/components/ui/button.tsx';
import { RemoveRoleFromUserModal } from '@/modules/access-control/roles/remove-role-from-user-modal.tsx';
import { AssignRolesToUserModal } from '@/modules/access-control/users/assign-roles-to-user-modal.tsx';
import { ResetPasswordModal } from '@/modules/access-control';

export function UserDetails() {
  const { userId } = useParams<{ userId: string }>();
  const userService = new UsersService(userId);
  const [user, setUser] = useState<Partial<IUser>>({});
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [showRemoveRoleModal, setShowRemoveRoleModal] = useState(false);
  const [showAssignRoleModal, setShowAssignRoleModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  function loadUser() {
    userService.getUser()
      .then((userData) => {
        setUser(userData)
        setSelectedRoles([]);
      })
      .catch((error) => {
        console.error(`[UserDetails][useEffect]: ${error}`);
      });
  }

  function removeUserFromRole(role: IRole) {
    setSelectedRoles([role.id]);
    setShowRemoveRoleModal(true);
  }

  return (
    <>
      <ResetPasswordModal
        open={showResetPasswordModal}
        user={user as IUser}
        onClose={() => setShowResetPasswordModal(false)}/>
      <RemoveRoleFromUserModal
        open={showRemoveRoleModal}
        user={user}
        selectedRoles={selectedRoles}
        onClose={(success) => {
          setShowRemoveRoleModal(false)
          if (success) {
            loadUser();
          }
        }}/>
      <AssignRolesToUserModal
        user={user}
        open={showAssignRoleModal}
        onClose={(success) => {
          setShowAssignRoleModal(false)
          if (success) {
            loadUser();
          }
        }}/>
      <PageWrapper>
        <Breadcrumb
          items={[
            { label: "Usuarios y Permisos", path: "/access-control" },
            { label: "Usuarios", path: "/access-control" },
            { label: user?.username || "", path: `/access-control/users/${user?.username}/details` },
          ]}
        />
        <div className="flex items-center justify-between space-y-2">
          <PageTitle title={userId} subtitle="Usuarios"/>
        </div>

        <TabWrapper defaultTab="details">
          {(selectedTab, setSelectedTab) => (
            <Tabs
              onValueChange={(value) => setSelectedTab(value)}
              defaultValue={selectedTab} className="w-full">
              <div className="flex items-center justify-between space-y-2">
                <TabsList>
                  <TabsTrigger value="details">Detalles</TabsTrigger>
                  <TabsTrigger value="roles">Roles</TabsTrigger>
                  <TabsTrigger value="access">Acceso y contraseña</TabsTrigger>
                </TabsList>
                {(selectedTab === 'roles') && (
                  <div className="flex items-center space-x-2">
                    {selectedRoles.length > 0 &&
                      <Button
                        variant="secondary"
                        onClick={() => setShowRemoveRoleModal(true)}
                        className="h-8">
                        Quitar roles seleccionados
                      </Button>}

                    <Button
                      className="h-8"
                      onClick={() => setShowAssignRoleModal(true)}
                    >
                      Asignar Rol
                    </Button>
                  </div>
                )}
              </div>
              <TabsContent value="details">
                <div className="mt-3 border-t border-gray-100">
                  <dl className="divide-y divide-gray-100">
                    <FactRow
                      bg="gray"
                      title="Nombre">
                    <span className="text-sm text-gray-900">
                      {user?.name}
                    </span>
                    </FactRow>
                    <FactRow
                      bg="white"
                      title="Usuario">
                    <span className="text-sm text-gray-900">
                      {user?.username}
                    </span>
                    </FactRow>
                  </dl>
                </div>
              </TabsContent>
              <TabsContent value="roles">
                <SimpleDataTable
                  selectedRecords={selectedRoles}
                  setSelectedRecords={setSelectedRoles}
                  idColumn="id"
                  columns={[
                    {
                      header: "Nombre",
                      field: "name",
                      render: (_cell, row: IRole) => <Link
                        className="link" to={`/access-control/roles/${row.id}/details`}>
                        {row.name}
                      </Link>
                    },
                    {
                      header: "Descripción",
                      field: "description"
                    },
                    {
                      header: "",
                      field: "id",
                      render: (_cell, role: IRole) => <Button
                        variant="link"
                        className="link p-0 h-min"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeUserFromRole(role);
                        }}>
                        Quitar
                      </Button>
                    }
                  ]}
                  style={{}}
                  records={user?.roles as [] || []}/>
              </TabsContent>
              <TabsContent value="access">
                <Button
                  onClick={() => setShowResetPasswordModal(true)}
                  className="h-8"
                >
                  Restablecer contraseña
                </Button>
              </TabsContent>
            </Tabs>)}
        </TabWrapper>
      </PageWrapper>
    </>
  );
}
