import { useState } from 'react';
import { Button, Table, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import axiosInstance from '../axios';

export default function SubmitOrder({ modal, close, cart }) {
  const [formdata, setFormdata] = useState([]);

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setFormdata((values) => ({ ...values, [name]: value }));
  }

  function closeModal() {
    close();
  }

  function submit() {
    let json = JSON.stringify({
      cart: cart,
      form: formdata
    });

    axiosInstance
      .post('/order/postorder.php?user_id=1', json)
      .then((response) => {
        alert('Tilaus lähetetty');
      })
      .catch((error) => {
        alert(error);
      });
    close();
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
          Tarkasta tilaustiedot
        </ModalHeader>
        <ModalBody>
          <Table>
            <thead>
              <tr>
                <th>Tuotenumero</th>
                <th>Tuotenimi</th>
                <th>Määrä</th>
                <th>Hinta</th>
              </tr>
            </thead>
            {cart.map((item) => (
              <tbody>
                <tr>
                  <td>{item.product_id}</td>
                  <td>{item.name}</td>
                  <td>{item.amount}</td>
                  <td>{(item.price * item.amount).toFixed(2)}</td>
                </tr>
              </tbody>
            ))}
          </Table>
          <Form>
            <Label>Laskutustapa</Label>
            <FormGroup tag="fieldset">
              <FormGroup check>
                <Input name="radio1" type="radio" value="email" onChange={handleChange} /> <Label check>Sähköposti</Label>
              </FormGroup>
              <FormGroup check>
                <Input name="radio1" type="radio" value="letter" onChange={handleChange} /> <Label check>Paperilasku</Label>
              </FormGroup>
            </FormGroup>
          </Form>
          <Button onClick={submit}>Tilaa</Button>
        </ModalBody>
      </Modal>
    </div>
  );
}
