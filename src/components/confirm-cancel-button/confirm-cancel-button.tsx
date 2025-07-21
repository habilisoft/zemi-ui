import { AlertDialog } from '@/components/ui/alert-dialog.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useState } from 'react';

type Props = {
  confirm: boolean;
  action: () => void;
  title?: string;
  description?: string;
  acceptButtonText?: string;
  cancelButtonText?: string;
  buttonText?: string;
  disabled?: boolean;
}

export const ConfirmCancelButton = (
  {
    action,
    title = "Confirmar",
    description = "Estás seguro de cancelar la operación? Los datos introducidos no se guardarán.",
    buttonText = "Cancelar",
    acceptButtonText = "Si, estoy seguro",
    cancelButtonText = "Cancelar" ,
    confirm,
    disabled
  }: Props
) => {

  const [confirmDialogIsOpen, setConfirmDialogIsOpen] = useState(false);

  const cancel = () => {
    if(confirm) {
      setConfirmDialogIsOpen(true);
    } else {
      action();
    }
  }

  return (
    <>
      <AlertDialog
        isOpen={confirmDialogIsOpen}
        cancel={() => setConfirmDialogIsOpen(false)}
        action={() => {
          action();
          setConfirmDialogIsOpen(false);
        }}
        title={title}
        description={description}
        acceptButtonText={acceptButtonText}
        cancelButtonText={cancelButtonText}
      />
      <Button
        variant="outline"
        type="button"
        disabled={disabled}
        onClick={cancel}>
        {buttonText}
      </Button>
    </>
  )
}
