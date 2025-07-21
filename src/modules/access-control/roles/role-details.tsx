import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import PageTitle from '@/components/ui/page-title.tsx';
import { useParams } from 'react-router-dom';
import { TabWrapper } from '@/components/tab-wrapper';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import { useState } from 'react';
import { IPermission, IRole } from '@/types';
import { FactRow } from '@/components/ui/fact-row.tsx';
import { SimpleDataTable } from '@/components/ui/simple-data-table';
import { PageWrapper } from '@/components/ui/page-wrapper.tsx';
import { Button } from '@/components/ui/button.tsx';
import { AssignPermissionsToRoleModal } from '@/modules/access-control/roles/assign-permissions-to-role-modal.tsx';
import { RemovePermissionFromRole } from '@/modules/access-control/roles/remove-permission-from-role-modal.tsx';
import { ModuleBadge } from '@/components/module-badge/module-badge.tsx';
import { gql } from '@/graphql/gql';
import { useQuery } from '@apollo/client';
import Spinner from '@/components/ui/spinner.tsx';

export function RoleDetails() {
  const { name } = useParams<{ name: string }>();
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [showRemovePermissionModal, setShowRemovePermissionModal] = useState(false);
  const [showAssignPermissionModal, setShowAssignPermissionModal] = useState(false);

  if(!name) return null;

  const GET_ROLE = gql(/* GraphQL */`
    query GetRole($name: String!) {
      role(name: $name) {
        name
        description
        systemRole
        permissions {
          name
          description
          module
        }
      }
    }
  `);

  const { data, refetch, loading } = useQuery(GET_ROLE, {
    variables: { name },
  });

  const role = data?.role as unknown as IRole;

  function removePermissionFromRole(perm: IPermission) {
    setSelectedPermissions([perm.name]);
    setShowRemovePermissionModal(true);
  }

  return (
    <>
      <RemovePermissionFromRole
        open={showRemovePermissionModal}
        role={role || {}}
        selectedPermissions={selectedPermissions}
        onClose={(success) => {
          setShowRemovePermissionModal(false)
          if (success) {
            refetch();
          }
        }}/>
      <AssignPermissionsToRoleModal
        role={role || {}}
        open={showAssignPermissionModal}
        onClose={(success) => {
          setShowAssignPermissionModal(false)
          if (success) {
            refetch();
          }
        }}/>
      <PageWrapper>
        <Breadcrumb
          items={[
            { label: "Usuarios y Permisos", path: "/access-control" },
            { label: "Roles", path: "/access-control/roles" },
            { label: name, path: `/access-control/users/${name}/details` },
          ]}
        />
        <div className="flex items-center justify-between space-y-2">
          <PageTitle title={name} subtitle="Roles"/>
        </div>

        {loading && <Spinner/>}
        {!loading && <TabWrapper defaultTab="details">
          {(selectedTab, setSelectedTab) => (
            <Tabs
              onValueChange={(value) => setSelectedTab(value)}
              defaultValue={selectedTab} className="w-full">
              <div className="flex items-center justify-between space-y-2">
                <TabsList>
                  <TabsTrigger value="details">Detalles</TabsTrigger>
                  {!role.systemRole && <TabsTrigger value="permissions">Permisos</TabsTrigger>}
                </TabsList>
                {(selectedTab === 'permissions') && (
                  <div className="flex items-center space-x-2">
                    {selectedPermissions.length > 0 &&
                      <Button
                        variant="secondary"
                        onClick={() => setShowRemovePermissionModal(true)}
                        className="h-8">
                        Quitar permisos seleccionados
                      </Button>}

                    <Button
                      className="h-8"
                      onClick={() => setShowAssignPermissionModal(true)}
                    >
                      Agregar permiso
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
                      {role?.name}
                    </span>
                    </FactRow>
                    <FactRow
                      bg="white"
                      title="Descripción">
                    <span className="text-sm text-gray-900">
                      {role?.description}
                    </span>
                    </FactRow>
                  </dl>
                </div>
              </TabsContent>
              {!role.systemRole && <TabsContent value="permissions">
                <SimpleDataTable
                  setSelectedRecords={setSelectedPermissions}
                  selectedRecords={selectedPermissions}
                  idColumn="name"
                  columns={[
                    {
                      header: "Permiso",
                      field: "description"
                    },
                    {
                      header: "Módulo",
                      field: "module",
                      render: (cell: string) => <ModuleBadge module={cell}/>
                    },
                    {
                      header: "",
                      field: "id",
                      render: (_cell, perm: IPermission) => <Button
                        variant="link"
                        className="link p-0 h-min"
                        onClick={(e) => {
                          e.stopPropagation();
                          removePermissionFromRole(perm);
                        }}>
                        Quitar
                      </Button>
                    }
                  ]}
                  style={{}}
                  records={role?.permissions as [] || []}/>
              </TabsContent>}
            </Tabs>)}
        </TabWrapper>}
      </PageWrapper>
    </>
  );
}
