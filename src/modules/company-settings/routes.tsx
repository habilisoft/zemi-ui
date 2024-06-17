import { BaseLayout } from '@/layouts';
import { CompanyInfo } from '@/modules/company-settings/company-info.tsx';
import { EditCompanyInfo } from '@/modules/company-settings/edit-company-info.tsx';

const menuItems = [
  {
    title: "Datos generales",
    path: "/company-settings",
  },
];

export const companySettingsRoutes = {
  path: "company-settings",
  element: <BaseLayout title="Ajustes de empresa" menuItems={menuItems} />,
  children: [
    {
      index: true,
      element: <CompanyInfo />,
    },
    {
      path: "edit",
      element: <EditCompanyInfo/>
    }
  ],
};
