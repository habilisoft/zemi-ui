import { AlertDialog } from '@/components/ui/alert-dialog.tsx';
import { useState } from 'react';
import { Button } from '@/components/ui/button.tsx';

type Props = {
  disabled: boolean;
  onCancel: () => void;
  confirmCancel: boolean;
  alertDialogText: string;
  alertDialogTitle: string;
  alertAcceptButtonText?: string;
  alertCancelButtonText?: string;
  buttonText?: string;
}

export function ConfirmCancelButton(
  {
    onCancel,
    confirmCancel,
    alertDialogTitle,
    alertDialogText,
    alertAcceptButtonText,
    alertCancelButtonText,
    buttonText = "Cancelar",
    disabled
  }: Props
) {
  const [alertDialogIsOpen, setAlertDialogIsOpen] = useState(false);

  return (
    <>
      <AlertDialog
        isOpen={alertDialogIsOpen}
        cancel={() => setAlertDialogIsOpen(false)}
        action={() => {
          onCancel();
          setAlertDialogIsOpen(false);
        }}
        title={alertDialogTitle}
        description={alertDialogText || ""}
        acceptButtonText={alertAcceptButtonText}
        cancelButtonText={alertCancelButtonText}
      />

      <Button
        onClick={() => {
          confirmCancel
            ? setAlertDialogIsOpen(true)
            : onCancel();
        }}
        variant="outline"
        type="button"
        disabled={disabled}
      >
        {buttonText}
      </Button>

    </>
  )
}
