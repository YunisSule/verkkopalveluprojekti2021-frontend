import { Row, Col, Form, FormGroup, Input, Label, Button, Table, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { useState } from 'react';

export default function SubmitOrder({ modal, close }) {
  const [formdata, setFormdata] = useState([]);
  function closeModal() {
    close();
  }

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setFormdata((values) => ({ ...values, [name]: value }));
  }

  function submit() {}

  return (
    <div>
      <Modal isOpen={modal}>
        <ModalHeader
          charCode="Y"
          toggle={() => {
            closeModal();
          }}
        >
          Syötä tilaustiedot
          {/* IF SIGNED IN, DIFFERENT MESSAGE */}
        </ModalHeader>
        <ModalBody>
          <Form>
            <Form className="mt-4 mb-4" onSubmit={submit}>
              <Row form>
                <Col md={12}>
                  <FormGroup>
                    <Label for="firstname">Etunimi</Label>
                    <Input id="firstname" name="firstname" onChange={handleChange} />
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <Label for="lastname">Sukunimi</Label>
                    <Input id="lastname" name="lastname" onChange={handleChange} />
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <Label for="email">Sähköposti</Label>
                    <Input id="email" name="email" onChange={handleChange} />
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <Label for="address">Osoite</Label>
                    <Input id="address" name="address" onChange={handleChange} />
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <Label for="city">Kaupunki</Label>
                    <Input id="city" name="city" onChange={handleChange} />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <Label for="postal_code">Postinumero</Label>
                    <Input id="postal_code" name="postal_code" onChange={handleChange} />
                  </FormGroup>
                </Col>
              </Row>
              <Button>Lähetä</Button>
            </Form>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}
