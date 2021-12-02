import { useState } from 'react';
import { Row, Col, Form, FormGroup, Input, Label, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SubmitOrder from './submitOrder';
import axiosInstance from '../axios';

export default function SignInOrRegisterModal({ modal, close }) {
  const [orderModal, setOrderModal] = useState(false);
  const userdata = {
    email: '',
    passwd: ''
  };

  function signIn() {
    axiosInstance
      .post('/auth/login.php', '', {
        headers: {
          Authorization: 'Basic ' + Buffer.from(userdata.email + ':' + userdata.passwd).toString('base64')
        },
        withCredentials: true
      })
      .then((response) => {
        //sessionStorage.setItem('token', response.data)
        console.log(response);
        alert('Kirjautuminen onnistui');
      })
      .catch((error) => alert('väärä sähköposti tai salasana'));
  }

  function closeModal() {
    close();
  }

  function modalClose() {
    setOrderModal(false);
  }

  return (
    <Modal isOpen={modal}>
      <ModalHeader
        charCode="Y"
        toggle={() => {
          closeModal();
        }}
      >
        Kirjaudu
      </ModalHeader>
      <ModalBody>
        <Form id="login-form-modal" onSubmit={signIn}>
          <FormGroup>
            <label htmlFor="e-mail">Sähköposti</label>
            <div>
              <Input name="e-mail" type="email" required="required" autoComplete="username" onChange={(e) => (userdata.email = e.target.value)} />
            </div>
          </FormGroup>
          <FormGroup>
            <label htmlFor="passwd">Salasana</label>
            <div>
              <Input type="password" name="password" required="required" onChange={(e) => (userdata.passwd = e.target.value)} />
            </div>
          </FormGroup>
          <ModalFooter>
            <Button className="text-center" id="signin-button" color="primary">
              Kirjaudu
            </Button>
            <Button
              onClick={() => {
                setOrderModal(!orderModal);
              }}
            >
              Rekisteröidy ja tilaa
            </Button>
            {orderModal ? <SubmitOrder modal={orderModal} close={modalClose} /> : null}
          </ModalFooter>
        </Form>
      </ModalBody>
    </Modal>
  );
}
