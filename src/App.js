import './App.css';
import NavBar from './components/Navbar';
import Content from './components/Content';
import Infobanner from './components/Infobanner';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';

function App() {

  const [cart, setCart] = useState([])    //shoppingcart variable

  function addToCart(item) {            //addToCart button function & item amount
    /*if (cart.some(item => item.id === item.id)) {
      const existingItem = cart.filter(item => item.id === item.id);
      updateAmount(parseInt(existingItem[0].amount) + 1,item);
    } else {*/
      item["amount"] = 1;
      const newCart = [...cart,item];
      setCart(newCart);
      localStorage.setItem('cart',JSON.stringify(cart));
    
  }

  function updateAmount(amount,item) {    //hoppincart update amount
    item.amount = amount;
    const index = cart.findIndex((item => item.id === item.id));
    const modifiedCart = Object.assign([...cart],{[index]:item});
    localStorage.setItem('cart',JSON.stringify(modifiedCart));
  }

  useEffect(() => {
    if ('cart' in localStorage) {
      setCart(JSON.parse(localStorage.getItem('cart')));
    }
  }, [])

  return (
    <>
      <Infobanner />
      <NavBar cart={cart}/>
      <Content 
      addToCart={addToCart} 
      cart={cart}
      updateAmount={updateAmount}/>
      <Footer />
    </>
  );
}

export default App;
