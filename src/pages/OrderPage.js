import React from 'react';
import { useState } from 'react';
import { Button, Container } from 'reactstrap';
import SignInOrRegisterModal from '../components/auth/SignInOrRegisterModal';
import Register from '../components/auth/Register';
import SubmitOrder from '../components/submitOrder';
import { IMAGE_PATH } from '../config';

export default function OrderPage({ cart, updateAmount, removeItem }) {
  const [signInOrRegiserModal, setSignInOrRegiserModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  const [orderModal, setOrderModal] = useState(false);

  function openOrderModal() {
    setSignInOrRegiserModal(false);
    setRegisterModal(false);
    setOrderModal(!orderModal);
  }
  function openSignInModal() {
    setSignInOrRegiserModal(true);
    setRegisterModal(false);
  }

  function openRegisterModal() {
    setSignInOrRegiserModal(false);
    setRegisterModal(!registerModal);
  }
  function closeModals() {
    setRegisterModal(false);
    setSignInOrRegiserModal(false);
    setOrderModal(false);
  }

  function changeAmount(e, item) {
    updateAmount(e.target.value, item);
  }

  return (
    <Container>
      <h3 style={{margin: "1em"}}>Ostoskori</h3>
      <div className='table-responsive'>
      <table className='table table-hover table-borderless'>
        {cart.map((item) => {
          return (
              <tbody>
                <tr>
                  <td>
                    <img className="cartimage" src={IMAGE_PATH + item.image_path} alt="Product" />
                  </td>
                  <td className="cart">{item.brand}</td>
                  <td className="cart">{item.name}</td>
                  <td className="cart">{(item.price * item.amount).toFixed(2)} €</td>
                  <td className="cart">
                    <input
                      style={{ width: '50px' }}
                      type="number"
                      step="1"
                      onChange={(e) => changeAmount(e, item)}
                      value={item.amount}
                    />
                  </td>
                  <td>
                    <Button onClick={() => removeItem(item)}>Delete</Button>
                  </td>
                </tr>
            </tbody> 
          );
        })}
      </table>
      </div>
      <Button
        onClick={() => {
          if (!sessionStorage.getItem('user_id')) {
            setSignInOrRegiserModal(!signInOrRegiserModal);
          } else {
            setOrderModal(!orderModal);
          }
        }}
      >
        Tilaa
      </Button>
      {signInOrRegiserModal ? (
        <SignInOrRegisterModal
          modal={signInOrRegiserModal}
          openReg={openRegisterModal}
          close={closeModals}
          openOrder={openOrderModal}
        />
      ) : null}
      {registerModal ? <Register modal={registerModal} close={closeModals} openSignIn={openSignInModal} /> : null}
      {orderModal ? <SubmitOrder modal={orderModal} close={closeModals} cart={cart} /> : null}
    </Container>
  );
}
