import { PageWrapper } from '@/components/ui/page-wrapper.tsx';
import PageTitle from '@/components/ui/page-title.tsx';
import { Favorites } from '@/modules/dashboard/widgets/favorites.tsx';

export const Dashboard = () => {
  return (
    <PageWrapper>
      <div className="p-8">
        <PageTitle title="Página de inicio"/>
      </div>

      <Favorites/>
    </PageWrapper>
  )
}
