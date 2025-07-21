import { PageWrapper } from '@/components/ui/page-wrapper.tsx';
import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import PageTitle from '@/components/ui/page-title.tsx';

export const FiscalSettings = () => {
  return (
    <PageWrapper>
      <Breadcrumb
        items={[
          { label: "Configuración Fiscal", path: "/fiscal-settings" },
          { label: "Panel", path: "/fiscal-settings" },
        ]}
      />
      <div className="flex items-center justify-between space-y-2">
        <PageTitle title="Panel"/>
      </div>
    </PageWrapper>
  );
}
