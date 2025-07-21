import { BaseLayout } from '@/layouts';
import { Rents } from '@/modules/rents/rents.tsx';
import { NewRent } from '@/modules/rents/new-rent.tsx';


const menuItems = [
  {
    title: "Rentas",
    path: "/rents",
  }
]

export const rentsRoutes = {
  path: "rents",
  element: <BaseLayout title="Rentas" menuItems={menuItems}/>,
  children: [
    {
      index: true,
      element: <Rents/>
    },
    {
      path: "/rents/new",
      element: <NewRent/>
    }
  ]
};
