import { BaseLayout } from '@/layouts';
import { Quotes } from '@/modules/sales/quotes/quotes.tsx';
import { Customers } from '@/modules/sales/customers/customers.tsx';
import { ListSales } from '@/modules/sales/sales/list-sales.tsx';
import { Orders } from '@/modules/sales/orders/orders.tsx';
import { NewCustomer } from '@/modules/sales/customers/new-customer.tsx';
import { NewSale } from '@/modules/sales/sales/new-sale.tsx';
import { ViewCustomer } from '@/modules/sales/customers/view-customer.tsx';
import { Sales } from '@/modules/sales/sales.tsx';

const menuItems = [
  {
    title: "Panel",
    path: "/sales",
  },
  {
    title: "Clientes",
    path: "/sales/customers",
  },
  {
    title: "Ventas",
    path: "/sales/sales",
  },
  {
    title: "Pedidos",
    path: "/sales/orders",
  },
  {
    title: "Cotizaciones",
    path: "/sales/quotes",
  }
]

export const salesRoutes = {
  path: "/sales",
  element: <BaseLayout title="Ventas" menuItems={menuItems}/>,
  children: [
    {
      index: true,
      element: <Sales/>,
    },
    {
      path: "quotes",
      element: <Quotes/>,
    },
    {
      path: "customers",
      element: <Customers/>,
    },
    {
      path: "customers/:id",
      element: <ViewCustomer/>
    },
    {
      path: "customers/new",
      element: <NewCustomer/>,
    },
    {
      path: "sales",
      element: <ListSales/>
    },
    {
      path: "sales/new",
      element: <NewSale/>
    },
    {
      path: "orders",
      element: <Orders/>
    }
  ],
}
