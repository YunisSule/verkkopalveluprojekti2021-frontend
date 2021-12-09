import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

export default function DetailModal({ title, isOpen, onHide, children }) {
  return (
    <Modal isOpen={isOpen} fullscreen={'lg'} size="xl" scrollable>
      <ModalHeader charCode="Y" toggle={() => onHide()}>
        {title}
      </ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={() => onHide()}>
          Sulje
        </Button>
      </ModalFooter>
    </Modal>
  );
}
