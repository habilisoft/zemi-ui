import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";

export const Construction = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [alertDialogIsOpen, setAlertDialogIsOpen] = useState(false);
  return (
    <div>
      Construction
      <br />
      <br />
      <Button onClick={() => setDialogIsOpen(true)}>Open Dialog</Button>
      <br />
      <br />
      <Button onClick={() => setAlertDialogIsOpen(true)}>
        Open Alert Dialog
      </Button>
      <AlertDialog
        isOpen={alertDialogIsOpen}
        cancel={() => setAlertDialogIsOpen(false)}
        action={() => setAlertDialogIsOpen(false)}
        title="Alert Dialog title"
        description="Alert Dialog description"
      />
      <Dialog
        isOpen={dialogIsOpen}
        close={() => setDialogIsOpen(false)}
        title="Dialog title"
      >
        Content
      </Dialog>
    </div>
  );
};
