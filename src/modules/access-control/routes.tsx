import { BaseLayout } from '@/layouts';
import { ListUsers, UserDetails, CreateUser } from '@/modules/access-control/users';
import { CreateRole, ListRoles, RoleDetails } from '@/modules/access-control/roles';

const menuItems = [
  {
    title: "Usuarios",
    path: "/access-control",
  },
  {
    title: "Roles",
    path: "/access-control/roles",
  },
];

export const accessControlRoutes = {
  path: "access-control",
  element: <BaseLayout title="Usuarios y Permisos" menuItems={menuItems}/>,
  children: [
    {
      index: true,
      element: <ListUsers/>,
    },
    {
      path: "users/:userId/details",
      element: <UserDetails/>
    },
    {
      path: "roles",
      element: <ListRoles/>
    },
    {
      path: "roles/new",
      element: <CreateRole/>
    },
    {
      path: "users/new",
      element: <CreateUser/>
    },
    {
      path: "roles/:roleId/details",
      element: <RoleDetails/>
    }
  ],
};
