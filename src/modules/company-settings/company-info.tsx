import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import { useCompoundStore } from '@/stores/compound-store.ts';
import { shallow } from 'zustand/shallow';
import { FactRow } from '@/components/ui/fact-row.tsx';
import PageTitle from '@/components/ui/page-title.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Link } from 'react-router-dom';

export function CompanyInfo() {
  const {
    companyInfo
  } = useCompoundStore(
    (state) => ({
      companyInfo: state.companyInfo,
    }),
    shallow
  );
  return (
    <div className="h-full flex-1 flex-col space-y-4">
      <Breadcrumb
        items={[
          { label: "Empresa", path: "/company-settings" },
          { label: "Datos Generales", path: "/company-settings" },
        ]}
      />

      <div className="flex items-center justify-between space-y-2">
        <PageTitle title="Datos Generales" subtitle="Ajustes de Empresa"/>
        <Button asChild>
          <Link to="edit">
            Editar
          </Link>
        </Button>
      </div>

      <div className="mt-3">
        <img src={companyInfo?.logo} alt="Company Logo" className="w-auto h-20"/>
        <div>
          <dl className="divide-y divide-gray-100">
            <FactRow
              title="Nombre"
              bg="white">
              {companyInfo?.name}
            </FactRow>
            <FactRow
              title="Dirección"
              bg="gray">
              <div style={{ whiteSpace: "pre-line" }}>
                {companyInfo?.address}
              </div>
            </FactRow>
            <FactRow
              title="Teléfono"
              bg="white">
              {companyInfo?.phone}
            </FactRow>
            <FactRow
              title="RNC"
              bg="gray">
              {companyInfo?.document}
            </FactRow>
            <FactRow
              title="Correo Electrónico"
              bg="white">
              {companyInfo?.email}
            </FactRow>
            <FactRow
              title="Sitio Web"
              bg="gray">
              {companyInfo?.website}
            </FactRow>
          </dl>
        </div>

      </div>
    </div>
  );
}
