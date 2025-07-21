import { PageWrapper } from '@/components/ui/page-wrapper.tsx';
import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import PageTitle from '@/components/ui/page-title.tsx';

export const Quotes = () => {
  return (
    <PageWrapper>
      <Breadcrumb items={
        [
          { label: "Ventas", path: "/sales" },
          { label: "Cotizaciones", path: "/sales/quotes" }
        ]
      }/>

      <PageTitle title="Cotizaciones" subtitle="Listado de cotizaciones"/>
    </PageWrapper>
  )
}
