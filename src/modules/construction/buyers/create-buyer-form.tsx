import { CompoundForm } from '@/components/ui/compound-form.tsx';
import { z } from 'zod';
import { BuyersService } from '@/services/buyers.service';
import { IBuyer } from '@/types';
import { Messages } from '@/lib/constants.tsx';
import { useState } from 'react';
import ClosableAlert from '@/components/ui/closable-alert.tsx';

interface Props {
  handleSuccess: (data: Record<string, string> | undefined) => void;
  confirmCancel: boolean;
  onCancel: () => void;
}

export function CreateBuyerForm(
  {
    handleSuccess,
    confirmCancel,
    onCancel,
  }: Props
) {

  const [error, setError] = useState<string | null>(null);
  const buyersService = new BuyersService();
  const [loading, setLoading] = useState(false);

  const handleCreateBuyer = (data: Record<string, string | string []>) => {
    setLoading(true);
    buyersService.createBuyer(data as IBuyer)
      .then(() => {
        handleSuccess(data as Record<string, string>);
      })
      .catch(({ response } ) => {
        setError(response?.data?.message || Messages.UNEXPECTED_ERROR);
      });
  }

  return (
    <>
      {error && <ClosableAlert color="danger">{error}</ClosableAlert>}
      <CompoundForm
        sendingRequest={loading}
        onSubmit={handleCreateBuyer}
        submitButtonText="Crear Cliente"
        onCancel={onCancel}
        confirmCancel={confirmCancel}
        alertDialogDesc="¿Estás seguro de cancelar la creación del cliente?"
        alertDialogText="Confirmar"
        alertAcceptButtonText="Si, estoy seguro"
        alertCancelButtonText="Continuar creando cliente"
        cancelButtonText="Cancelar"
        inputs={[
          {
            label: "Nombre",
            name: "name",
            defaultValue: "",
            type: "text",
            placeholder: "",
            validations: z.string().min(2, {
              message: "Nombre debe tener como mínimo 2 caracteres.",
            }),
          }
        ]}
      />
    </>
  )
}
