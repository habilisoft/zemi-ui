import { PageWrapper } from '@/components/ui/page-wrapper.tsx';
import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import PageTitle from '@/components/ui/page-title.tsx';
import { UserForm } from '@/modules/access-control/users/user-form.tsx';
import { useState } from 'react';
import { IUserCreated } from '@/types';
import { UserCreated } from '@/modules/access-control/users/user-created.tsx';

function CreateUser() {
  const [success, setSuccess] = useState(false);
  const [createdUser, setCreatedUser] = useState<IUserCreated>({} as IUserCreated);

  const handleSuccess = (request: IUserCreated) => {
    setSuccess(true);
    setCreatedUser(request)
  }
  return (
    <PageWrapper>
      <Breadcrumb
        items={[
          {
            label: "Usuarios y Permisos",
            path: "/access-control"
          }, {
            label: "Usuarios",
            path: "/access-control"
          }, {
            label: "Crear Usuario",
            path: "/access-control/users/new"
          }
        ]}/>
      <PageTitle
        title="Crear Usuario"
        subtitle="Usuarios y Permisos"/>

      {!success && <UserForm
        onSuccess={handleSuccess}
        selectedRoles={[]}/>}

      {success && <UserCreated user={createdUser}/>}

    </PageWrapper>
  )
}

export { CreateUser };
