import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import PageTitle from '@/components/ui/page-title.tsx';
import { PageWrapper } from '@/components/ui/page-wrapper.tsx';

export const Construction = () => {
  return (
    <PageWrapper>
      <Breadcrumb
        items={[
          { label: "Constructora", path: "/construction" },
          { label: "Dashboard", path: "/construction" },
        ]}
      />
      <div className="flex items-center justify-between space-y-2">
        <PageTitle title="Dashboard"/>
      </div>
    </PageWrapper>
  );
};
