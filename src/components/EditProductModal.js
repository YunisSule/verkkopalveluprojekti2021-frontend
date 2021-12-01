import { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axiosInstance from '../axios';
import ProductForm from './ProductForm';

export default function EditProductModal({ item, onHide, onSubmit }) {
  const [open, setOpen] = useState(true);
  const [formData, setFormData] = useState(item);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    await axiosInstance.post('/product/updateproduct.php', formData).catch((error) => alert(error));
  };

  const closeModal = () => {
    setOpen(false);
    onHide();
  };

  return (
    <Modal isOpen={open} scrollable>
      <ModalHeader charCode="Y" toggle={() => closeModal()}>
        Muokkaa tuotetta
      </ModalHeader>
      <ModalBody>
        <ProductForm formData={formData} handleChange={handleChange} />
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={() => closeModal()}>
          Sulje
        </Button>
        <Button
          color="primary"
          onClick={(e) => {
            submitForm(e);
            closeModal();
            onSubmit();
          }}
        >
          Päivitä
        </Button>
      </ModalFooter>
    </Modal>
  );
}
