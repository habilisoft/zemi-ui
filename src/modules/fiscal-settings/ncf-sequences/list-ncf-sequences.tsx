import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import { PageWrapper } from '@/components/ui/page-wrapper.tsx';
import PageTitle from '@/components/ui/page-title.tsx';
import PageTitleContainer from '@/components/ui/page-title-container.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Formats from '@/lib/formatters.ts';
import { SimpleDataTable } from '@/components/ui/simple-data-table';
import Spinner from '@/components/ui/spinner.tsx';
import { useNcfSequences } from '@/hooks/taxes/use-ncf-sequences.tsx';
import { NcfSequence, NcfSequenceId } from '@/graphql/graphql.ts';
import { NcfTypes } from '@/lib/constants.tsx';


const columns = [
  {
    header: "Tipo",
    field: "id",
    render: (cell: NcfSequenceId) => NcfTypes.find((t) => t.value === cell.ncfType)?.displayName || '',
  },
  {
    header: "Sequencia Inicial",
    field: "initialSequence",
    render: (_: number, row: NcfSequence) => Formats.ncfSequence(row.initialSequence, row.id.ncfType, row.ncfSeries),
    style: { textAlign: "right" },
  },
  {
    header: "Sequencia Final",
    field: "finalSequence",
    render: (_: number, row: NcfSequence) => Formats.ncfSequence(row.finalSequence, row.id.ncfType, row.ncfSeries),
    style: { textAlign: "right" },
  },
  {
    header: "Sequencia Actual",
    field: "currentSequence",
    render: (_: number, row: NcfSequence) => Formats.ncfSequence(row.currentSequence, row.id.ncfType, row.ncfSeries),
    style: { textAlign: "right" },
  },
  {
    header: "Cantidad disponible",
    field: "currentSequence",
    render: (_: number, row: NcfSequence) => row.finalSequence - row.currentSequence,
    style: { textAlign: "right" },
  },
  {
    header: "Fecha de Expiración",
    field: "expirationDate",
    render: (cell: string) => Formats.dateWithNames(cell),
  },
  {
    header: "Activo",
    field: "active",
    render: (cell: boolean) => cell ? "Si" : "No",
  },
]

export const ListNcfSequences = () => {
  const { loading, ncfSequences, reload } = useNcfSequences();
  if (loading) return <Spinner/>;
  return (
    <PageWrapper>
      <Breadcrumb
        items={[
          { label: "Configuración Fiscal", path: "/fiscal-settings" },
          { label: "Comprobantes Fiscales", path: "/fiscal-settings/ncf-sequences" },
        ]}
      />
      <PageTitleContainer>
        <PageTitle title="Comprobantes Fiscales"/>
        <Button asChild>
          <Link to="new">
            <Plus className="size-4 mr-2"/> Agregar Secuencia
          </Link>
        </Button>
      </PageTitleContainer>
      <SimpleDataTable
        columns={columns}
        style={{ height: "calc(100vh - 350px)" }}
        isSearchable
        placeholder="Buscar por nombre o porcentaje"
        records={ncfSequences as []}/>
    </PageWrapper>
  );
}
