import axios from 'axios';
import { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import ProductForm from './ProductForm';

export default function EditProductModal({ item, onHide, onSubmit }) {
  const baseURL = 'http://localhost/verkkopalveluprojekti2021-backend';
  const [open, setOpen] = useState(true);
  const [formData, setFormData] = useState(item);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post(baseURL + '/product/updateproduct.php', formData, {
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      })
      .catch((error) => alert(error));
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