import { Dialog, DialogProps } from '@/components/ui/dialog';
import { CategoryForm } from '@/modules/catalog/categories/category-form.tsx';



export function CategoryModal(
  { close, isOpen }: DialogProps
) {

  return (
    <Dialog
      title="Crear Categoría"
      isOpen={isOpen}
      close={close}
    >
      <CategoryForm
        confirmCancel={true}
        onCancel={close}
        handleSuccess={close}
      />
    </Dialog>
  );
}
