import { BaseLayout } from '@/layouts';

const menuItems = [
  {
    title: "Dashboard",
    path: "/accounting",
  }]

export const accountingRoutes = {
  path: "accounting",
  element: <BaseLayout title="Contabilidad" menuItems={menuItems} />,
};
