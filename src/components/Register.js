import { Row, Col, Form, FormGroup, Input, Label, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { useState } from 'react';
import axiosInstance from '../axios';

export default function Register({ modal, close, openSignIn }) {
  const [formdata, setFormdata] = useState([]);

  function closeModal() {
    close();
  }

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setFormdata((values) => ({ ...values, [name]: value }));
  }

  function submit() {
    axiosInstance
      .post('/auth/register.php', formdata)
      .then((response) => {
        alert('Käyttäjätili rekisteröity');
      })
      .catch((error) => {
        alert('Rekisteröityminen epäonnistui');
      });
    openSignIn();
  }

  return (
    <div>
      <Modal isOpen={modal}>
        <ModalHeader
          charCode="Y"
          toggle={() => {
            closeModal();
          }}
        >
          Syötä asiakastiedot
        </ModalHeader>
        <ModalBody>
          <Form className="mt-4 mb-4" onSubmit={submit}>
            <Row form>
              <Col md={12}>
                <FormGroup>
                  <Label for="username">Käyttäjänimi</Label>
                  <Input id="username" name="username" required onChange={handleChange} />
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
                  <Label for="password">Salasana</Label>
                  <Input type="password" id="password" name="password" required onChange={handleChange} />
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
                  <Label for="firstname">Etunimi</Label>
                  <Input id="firstname" name="firstname" required onChange={handleChange} />
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
                  <Label for="lastname">Sukunimi</Label>
                  <Input id="lastname" name="lastname" required onChange={handleChange} />
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
                  <Label for="email">Sähköposti</Label>
                  <Input type="email" id="email" name="email" required onChange={handleChange} />
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
                  <Label for="address">Osoite</Label>
                  <Input id="address" name="address" required onChange={handleChange} />
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
                  <Label for="city">Kaupunki</Label>
                  <Input id="city" name="city" required onChange={handleChange} />
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup>
                  <Label for="postal_code">Postinumero</Label>
                  <Input id="postal_code" name="postal_code" required onChange={handleChange} />
                </FormGroup>
              </Col>
            </Row>
            <Label>Rekisteröidy asiakkaaksi ja lähetä</Label>
            <br />
            <Button>Lähetä</Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}
