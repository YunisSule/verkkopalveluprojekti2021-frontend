import { Row, Col, Form, FormGroup, Input, Label, Button, Table, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { useState } from 'react';
import axiosInstance from '../axios';

export default function SubmitOrder({ modal, close, cart }) {
  function closeModal() {
    close();
  }

  function submit() {
    let json = JSON.stringify(cart[0]);

    axiosInstance
      .post('/order/postorder.php?user_id=1', json)
      .then((response) => {})
      .catch((error) => {
        alert(error);
      });
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
          <Button onClick={submit}>Tilaa</Button>
        </ModalBody>
      </Modal>
    </div>
  );
}
