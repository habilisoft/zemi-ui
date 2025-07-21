import { Dialog, DialogProps } from '@/components/ui/dialog';
import { ProductForm } from '@/modules/catalog/products/product-form.tsx';

export function ProductModal(
  { close, isOpen }: DialogProps
) {

  return (
    <Dialog
      title="Crear Producto"
      isOpen={isOpen}
      close={close}
    >
      <ProductForm
        onCancel={close}
        handleSuccess={close}
      />
    </Dialog>
  );
}
