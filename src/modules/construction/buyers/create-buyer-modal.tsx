import { Dialog, DialogProps } from '@/components/ui/dialog';
import { CreateBuyerForm } from '@/modules/construction/buyers/create-buyer-form.tsx';


export function CreateBuyerModal(
{ close, isOpen }: DialogProps
) {

  return (
    <Dialog
      title="Crear Cliente"
      isOpen={isOpen}
      close={close}
    >
      <CreateBuyerForm
        confirmCancel={false}
        onCancel={close}
        handleSuccess={close}
      />
    </Dialog>
  );
}
