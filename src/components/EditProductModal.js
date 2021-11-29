import axios from 'axios';
import { useState } from 'react';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';

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
        <Form>
          <Row form>
            <FormGroup>
              <Label for="name">Nimi</Label>
              <Input id="name" name="name" type="text" value={formData.name} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="brand">Brändi</Label>
              <Input id="brand" name="brand" type="text" value={formData.brand} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="description">Kuvaus</Label>
              <Input
                id="description"
                name="description"
                type="textarea"
                value={formData.description}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="image_path">Kuvan polku</Label>
              <Input
                id="image_path"
                name="image_path"
                type="text"
                value={formData.image_path}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="price">Hinta</Label>
              <Input id="price" name="price" type="text" value={formData.price} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="category_id">Kategoria ID</Label>
              <Input
                id="category_id"
                name="category_id"
                type="text"
                value={formData.category_id}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="color">Väri</Label>
              <Input id="color" name="color" type="text" value={formData.color} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="stock">Varastossa</Label>
              <Input id="stock" name="stock" type="text" value={formData.stock} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="speed">Nopeus</Label>
              <Input id="speed" name="speed" type="text" value={formData.speed} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="glide">Liito</Label>
              <Input id="glide" name="glide" type="text" value={formData.glide} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="turn">Vakaus</Label>
              <Input id="turn" name="turn" type="text" value={formData.turn} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="fade">Feidi</Label>
              <Input id="fade" name="fade" type="text" value={formData.fade} onChange={handleChange} />
            </FormGroup>
          </Row>
        </Form>
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
