import { BaseLayout } from '@/layouts';
import { FiscalSettings } from '@/modules/fiscal-settings/fiscal-settings.tsx';
import { Taxes } from '@/modules/fiscal-settings/taxes';
import { ListNcfSequences } from '@/modules/fiscal-settings/ncf-sequences';
import { NewSequence } from '@/modules/fiscal-settings/ncf-sequences/new-sequence.tsx';

const menuItems = [
  {
    title: "Panel",
    path: "/fiscal-settings",
  },
  {
    title: "Comprobantes Fiscales",
    path: "/fiscal-settings/ncf-sequences",
  },
  {
    title: "Impuestos",
    path: "/fiscal-settings/taxes",
  },
]

export const fiscalSettingsRoutes = {
  path: "/fiscal-settings",
  element: <BaseLayout title="Configuración Fiscal" menuItems={menuItems}/>,
  children: [
    {
      index: true,
      element: <FiscalSettings/>,
    },
    {
      path: "ncf-sequences",
      element: <ListNcfSequences/>,
    },
    {
      path: "taxes",
      element: <Taxes/>,
    },
    {
      path: "ncf-sequences/new",
      element: <NewSequence/>,
    }
  ],
}
