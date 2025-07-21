import { PageWrapper } from '@/components/ui/page-wrapper.tsx';
import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import PageTitle from '@/components/ui/page-title.tsx';

export const Sales = () => {
  return (
    <PageWrapper>
      <Breadcrumb
        items={[
          { label: "Ventas", path: "/sales" },
          { label: "Panel", path: "/sales" },
        ]}
      />
      <div className="flex items-center justify-between space-y-2">
        <PageTitle title="Panel"/>
      </div>
    </PageWrapper>
  );
}
