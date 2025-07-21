import { PageWrapper } from '@/components/ui/page-wrapper.tsx';
import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import PageTitle from '@/components/ui/page-title.tsx';
import PageTitleContainer from '@/components/ui/page-title-container.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

export const Orders = () => {
  return (
    <PageWrapper>
      <Breadcrumb items={
        [
          { label: "Ventas", path: "/sales" },
          { label: "Pedidos", path: "/sales/orders" }
        ]
      }/>

      <PageTitleContainer>
        <PageTitle title="Pedidos"/>
        <Button
          asChild>
          <Button asChild>
            <Link to="new">
              <Plus className="size-4 mr-2"/> Nuevo Pedido
            </Link>
          </Button>
        </Button>
      </PageTitleContainer>

    </PageWrapper>
  )
}
