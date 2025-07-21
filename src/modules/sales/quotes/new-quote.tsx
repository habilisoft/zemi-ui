import { PageWrapper } from '@/components/ui/page-wrapper.tsx';
import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import PageTitle from '@/components/ui/page-title.tsx';

export const NewQuote = () => {
  return (
    <PageWrapper>
      <Breadcrumb items={
        [
          { label: "Ventas", path: "/sales" },
          { label: "Cotizaciones", path: "/sales/quotes" },
          { label: "Nueva cotización", path: "/sales/quotes/new" }
        ]
      }/>
      <PageTitle
        title="Nueva cotización"
        subtitle="Crear una nueva cotización"/>
    </PageWrapper>
  )
}
