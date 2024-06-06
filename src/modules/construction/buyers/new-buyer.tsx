import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import { CreateBuyerForm } from '@/modules/construction/buyers/create-buyer-form.tsx';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export function NewBuyer() {
  const navigate = useNavigate();

  function handleSuccess() {
    toast.success("Cliente creado exitosamente");
    navigate("/construction/buyers");
  }

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Constructora", path: "/construction" },
          { label: "Proyectos", path: "/construction/projects" },
          { label: "Nuevo Proyecto", path: "/construction/projects/new" },
        ]}
      />
      <div className="max-w-md mx-auto mt-8">
        <CreateBuyerForm
          handleSuccess={handleSuccess}
          confirmCancel={true}
          onCancel={()=>navigate("/construction/buyers")}/>
      </div>
    </div>
  );
}
