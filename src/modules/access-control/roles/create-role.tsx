import { PageWrapper } from '@/components/ui/page-wrapper.tsx';
import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import PageTitle from '@/components/ui/page-title.tsx';
import { RoleForm } from '@/modules/access-control';

function CreateRole() {

  return (
    <PageWrapper>
      <Breadcrumb
        items={[
          {
            label: "Usuarios y Permisos",
            path: "/access-control"
          }, {
            label: "Roles",
            path: "/access-control/roles"
          }, {
            label: "Crear Role",
            path: "/access-control/roles/new"
          }
        ]}/>
      <PageTitle title={"Crear Role"} subtitle={"Usuarios y Permisos"}/>

      <RoleForm selectedPermissions={[]}/>
    </PageWrapper>
  )
}

export { CreateRole };
