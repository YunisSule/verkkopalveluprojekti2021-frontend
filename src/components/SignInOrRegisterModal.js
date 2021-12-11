import { useState } from 'react';
import { Form, FormGroup, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axiosInstance from '../axios';

export default function SignInOrRegisterModal({ modal, close, openReg, openOrder }) {
  const [userToken, setUserToken] = useState('');
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
        const tokenString = ('token', JSON.stringify(response.data));
        const Token = JSON.parse(tokenString);
        setUserToken(Token.token);
        sessionStorage.setItem('token', Token.token);
        sessionStorage.setItem('user_id', Token.user_id);
        alert(tokenString);
      })
      .catch((error) => alert(error));
    openOrder();
  }

  function modalClose() {
    close();
  }

  return (
    <Modal isOpen={modal}>
      <ModalHeader
        charCode="Y"
        toggle={() => {
          modalClose();
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
                openReg();
              }}
            >
              Rekisteröidy ja tilaa
            </Button>
          </ModalFooter>
          <input type="hidden" name="token" value="" />
        </Form>
      </ModalBody>
    </Modal>
  );
}
