import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

export default function EditModal({ title, action, onHide, children }) {
  return (
    <Modal isOpen={true} scrollable>
      <ModalHeader charCode="Y" toggle={() => onHide()}>
        {title}
      </ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={() => onHide()}>
          Sulje
        </Button>
        <Button
          color="primary"
          onClick={() => {
            onHide();
            action();
          }}
        >
          Päivitä
        </Button>
      </ModalFooter>
    </Modal>
  );
}
