import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import { PageWrapper } from '@/components/ui/page-wrapper.tsx';
import PageTitle from '@/components/ui/page-title.tsx';
import { useTaxes } from '@/hooks/taxes';
import { SimpleDataTable } from '@/components/ui/simple-data-table';
import Spinner from '@/components/ui/spinner.tsx';
import Formats from '@/lib/formatters.ts';


const columns = [
  {
    header: "Nombre",
    field: "name",
  },
  {
    header: "Porcentaje",
    field: "rate",
    render: (cell: number) => Formats.percentage(cell),
  }
]

export const Taxes = () => {
  const { loading, taxes, reload } = useTaxes();
  if (loading) return <Spinner/>;

  return (
    <PageWrapper>
      <Breadcrumb
        items={[
          { label: "Configuración Fiscal", path: "/fiscal-settings" },
          { label: "Impuestos", path: "/fiscal-settings/taxes" },
        ]}
      />
      <div className="flex items-center justify-between space-y-2">
        <PageTitle title="Impuestos"/>
      </div>
      <SimpleDataTable
        columns={columns}
        style={{ height: "calc(100vh - 350px)" }}
        isSearchable
        placeholder="Buscar por nombre o porcentaje"
        records={taxes as []}/>
    </PageWrapper>
  );
}
