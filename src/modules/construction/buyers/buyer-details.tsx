import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import PageTitle from '@/components/ui/page-title.tsx';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IBuyer } from '@/types';
import { BuyersService } from '@/services/buyers.service.ts';
import { PageWrapper } from '@/components/ui/page-wrapper.tsx';

export function BuyerDetails() {
  const { buyerId } = useParams();
  const [buyer, setBuyer] = useState<IBuyer>({} as IBuyer);
  const buyerService = new BuyersService(buyerId);

  useEffect(() => {
    async function fetchBuyer() {
      const buyerResponse = await buyerService.getBuyer();
      setBuyer(buyerResponse);
    }
    fetchBuyer();
  }, []);

  return (
    <PageWrapper>
      <Breadcrumb
        items={[
          { label: "Constructora", path: "/construction" },
          { label: "Clientes", path: "/construction/buyers" },
          { label: buyer.name, path: `/construction/buyers/${buyer.id}/details` },
        ]}
      />
      <div className="flex items-center justify-between space-y-2">
        <div>
          <PageTitle
            title={<div className="flex items-center space-x-4">
              <div>{buyer?.name}</div></div>}/>
        </div>
      </div>
    </PageWrapper>
  )

}
