import { PageWrapper } from '@/components/ui/page-wrapper.tsx';
import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import PageTitle from '@/components/ui/page-title.tsx';
import { FactRow } from '@/components/ui/fact-row.tsx';
import { useCompoundStore } from '@/stores/compound-store.ts';

export function UserInfo() {
  const user = useCompoundStore(state => state.authUser);
  return (
    <PageWrapper>
      <Breadcrumb
        items={
          [
            { label: "Ajustes de usuario", path: "/user-settings" },
            { label: "Información de usuario", path: "/user-settings" }
          ]
        }/>

      <PageTitle
        title="Información de usuario"
        subtitle="Ajustes de usuario"/>

      <div className="mt-3 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <FactRow
            bg="gray"
            title="Nombre">
                    <span className="text-sm text-gray-900">
                      {user?.name}
                    </span>
          </FactRow>
          <FactRow
            bg="white"
            title="Usuario">
                    <span className="text-sm text-gray-900">
                      {user?.username}
                    </span>
          </FactRow>
        </dl>
      </div>
    </PageWrapper>
  );
}
