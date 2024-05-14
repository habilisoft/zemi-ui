import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useState } from "react";

export const Construction = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div>
      Construction
      <br />
      <br />
      <Button onClick={() => setModalIsOpen(true)}>Open modal</Button>
      <Modal
        isOpen={modalIsOpen}
        close={() => setModalIsOpen(false)}
        title="Modal title"
      >
        Content
      </Modal>
    </div>
  );
};
