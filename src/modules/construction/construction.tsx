import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import PageTitle from '@/components/ui/page-title.tsx';

export const Construction = () => {
  return (
    <div className="h-full flex-1 flex-col space-y-4">
      <Breadcrumb
        items={[
          { label: "Constructora", path: "/construction" },
          { label: "Dashboard", path: "/construction" },
        ]}
      />
      <div className="flex items-center justify-between space-y-2">
        <PageTitle title="Dashboard"/>
      </div>
    </div>
  );
};
