import { BaseLayout } from '@/layouts';
import { Catalog } from '@/modules/catalog/catalog.tsx';
import { Products } from '@/modules/catalog/products/products.tsx';
import { NewProduct } from '@/modules/catalog/products/new-product.tsx';
import { Categories } from '@/modules/catalog/categories/categories.tsx';
import { NewCategory } from '@/modules/catalog/categories/new-category.tsx';
import { EditCategory } from '@/modules/catalog/categories/edit-category.tsx';
import { ImportProducts } from '@/modules/catalog/products/import-products.tsx';
import { ViewCategory } from '@/modules/catalog/categories/view-category.tsx';
import { ViewProduct } from '@/modules/catalog/products/view-product.tsx';

const menuItems = [
  {
    title: "Panel",
    path: "/catalog",
  },
  {
    title: "Productos",
    path: "/catalog/products",
  },
  {
    title: "Categorías",
    path: "/catalog/categories",
  }
]

export const catalogRoutes = {
  path: "/catalog",
  element: <BaseLayout title="Catálogo" menuItems={menuItems}/>,
  children: [
    {
      index: true,
      element: <Catalog/>,
    },
    {
      path: "products",
      element: <Products/>,
    },
    {
      path: "products/new",
      element: <NewProduct/>,
    },
    {
      path: "categories",
      element: <Categories/>
    },
    {
      path: "categories/new",
      element: <NewCategory/>
    },
    {
      path: "categories/:id",
      element: <ViewCategory/>
    },
    {
      path: "categories/:id/edit",
      element: <EditCategory/>
    },
    {
      path: "products/:id",
      element: <ViewProduct/>
    },
    {
      path: "products/import",
      element: <ImportProducts/>
    }
  ],
}
