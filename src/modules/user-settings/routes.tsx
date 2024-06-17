import { BaseLayout } from '@/layouts';
import { ChangePassword } from '@/modules/user-settings/change-password.tsx';
import { UserInfo } from '@/modules/user-settings/user-info.tsx';

const menuItems = [
  {
    title: "Cuenta",
    path: "/user-settings",
  },
  {
    title: "Cambiar contraseña",
    path: "/user-settings/change-password",
  },
];

export const userSettingsRoutes = {
  path: "user-settings",
  element: <BaseLayout title="Ajustes de usuario" menuItems={menuItems} />,
  children: [
    {
      index: true,
      element: <UserInfo />,
    },
    {
      path: "change-password",
      element: <ChangePassword />,
    },
  ],
};
