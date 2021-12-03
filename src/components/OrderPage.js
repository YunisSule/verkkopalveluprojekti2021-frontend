import React from 'react';
import { useState } from 'react';
import { Button } from 'reactstrap';
import SignInOrRegisterModal from './SignInOrRegisterModal';
import SubmitOrder from './submitOrder';

const image_path = 'http://localhost/verkkopalveluprojekti2021-backend/images/';

export default function OrderPage({ cart, updateAmount, removeItem }) {
  const [signInOrRegiserModal, setSignInOrRegiserModal] = useState(false);
  const [orderModal, setOrderModal] = useState(false);

  function openRegisterModal() {
    setSignInOrRegiserModal(false);
    setOrderModal(!orderModal);
  }
  function closeModals() {
    setOrderModal(false);
    setSignInOrRegiserModal(false);
  }

  function changeAmount(e, item) {
    updateAmount(e.target.value, item);
  }

  return (
    <div>
      <h3>Shopping cart</h3>
      <table>
        {cart.map((item) => {
          return (
            <tr>
              <td>
                <img className="cartimage" src={image_path + item.image_path} alt="Product image" />
              </td>
              <td className="cart">{item.brand}</td>
              <td className="cart">{item.name}</td>
              <td className="cart">{item.price} €</td>
              <td className="cart">
                <input style={{ width: '50px' }} type="number" step="1" onChange={(e) => changeAmount(e, item)} value={item.amount} />
              </td>
              <td><a href='#' onClick={() => removeItem(item)}>Delete</a></td>
            </tr>
          );
        })}
      </table>
      <Button onClick={() => setSignInOrRegiserModal(!signInOrRegiserModal)}>Tilaa</Button>
      {signInOrRegiserModal ? <SignInOrRegisterModal modal={signInOrRegiserModal} openReg={openRegisterModal} close={closeModals} /> : null}
      {orderModal ? <SubmitOrder modal={orderModal} close={closeModals} /> : null}
    </div>
  );
}
