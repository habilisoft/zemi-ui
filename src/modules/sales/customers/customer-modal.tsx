import { Dialog, DialogProps } from '@/components/ui/dialog.tsx';
import { CustomerForm } from '@/modules/sales/customers/customer-form.tsx';

export const CustomerModal = ( { close, isOpen }: DialogProps) => {

  return (
    <Dialog
      title="Crear Cliente"
      isOpen={isOpen}
      close={close}
    >
      <CustomerForm
        confirmCancel={true}
        onCancel={close}
        handleSuccess={close}
      />
    </Dialog>
  );
}
