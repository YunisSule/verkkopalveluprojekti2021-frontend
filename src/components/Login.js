import { Navbar, NavbarToggler, NavbarBrand, Collapse, NavItem, Nav, NavLink, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup } from 'reactstrap';
import { useState } from 'react';
import axiosInstance from '../axios';

export default function Login({ onHide }) {
  const [userToken, setUserToken] = useState('');
  const [open, setOpen] = useState(true);
  const userdata = {
    email: '',
    passwd: ''
  };

  const loginUser = async () => {
    axiosInstance
      .post('/auth/login.php', '', {
        headers: {
          Authorization: 'Basic ' + Buffer.from(userdata.email + ':' + userdata.passwd).toString('base64')
        },
        withCredentials: true
      })
      .then((response) => {
        const tokenString = ('token', JSON.stringify(response.data));
        const Token = JSON.parse(tokenString);
        setUserToken(Token.token);
        sessionStorage.setItem('token', Token.token);
        sessionStorage.setItem('user_id', Token.user_id);
        alert(tokenString);
      })
      .catch((error) => alert(error));
  };

  const closeModal = () => {
    setOpen(false);
    onHide();
  };

  return (
    <Modal isOpen={open}>
      <ModalHeader toggle={() => closeModal()}>Kirjaudu</ModalHeader>
      <ModalBody>
        <Form
          id="login-form-modal"
          onSubmit={() => {
            loginUser();
            closeModal();
          }}
        >
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
            <Button className="text-center" id="login-button" color="primary">
              Kirjaudu
            </Button>
          </ModalFooter>
          <input type="hidden" name="token" value="" />
        </Form>
      </ModalBody>
    </Modal>
  );
}
