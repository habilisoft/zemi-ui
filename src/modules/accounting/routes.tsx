import { BaseLayout } from '@/layouts';

const menuItems = [
  {
    title: "Panel",
    path: "/accounting",
  }]

export const accountingRoutes = {
  path: "accounting",
  element: <BaseLayout title="Contabilidad" menuItems={menuItems} />,
};
