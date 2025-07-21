import { PageWrapper } from '@/components/ui/page-wrapper.tsx';
import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import PageTitle from '@/components/ui/page-title.tsx';
import { useNavigate } from 'react-router-dom';
import { CustomerForm } from '@/modules/sales/customers/customer-form.tsx';

export const NewCustomer = () => {
  const navigate = useNavigate();
  return (
    <PageWrapper>
      <Breadcrumb items={
        [
          { label: "Ventas", path: "/sales" },
          { label: "Clientes", path: "/sales/customers" },
          { label: "Nuevo Cliente", path: "/sales/customers/new" }
        ]
      }/>
      <PageTitle title="Nuevo Cliente"/>
      <CustomerForm
        confirmCancel={true}
        onCancel={() => navigate("/sales/customers")}
        handleSuccess={() => navigate("/sales/customers")}
      />
    </PageWrapper>
)
}
