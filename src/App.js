import './App.css'
import NavBar from './components/Navbar'
import Content from './components/Content'
import Infobanner from './components/Infobanner'
import Footer from './components/Footer'
import { useState, useEffect } from 'react'
import Productpage from './components/Productpage'
import useToken from './components/useToken'

function App () {
  const [cart, setCart] = useState([]) //shoppingcart variable
  // const { token, setToken } = useToken()
  
  useEffect(() => {
    if ('cart' in localStorage) {
      setCart(JSON.parse(localStorage.getItem('cart')))
    }
  }, [])

  function addToCart (item) {   //addToCart button function & item amount
      /* if (cart.some(item => item.product_id)) {
      const existingItem = cart.filter(item => item.product_id)
      updateAmount(parseInt(existingItem[0].amount) + 1, item)
      console.log(item);
    } else {   */
      item['amount'] = 1
      const newCart = [...cart,item]
      setCart(newCart)
      localStorage.setItem('cart', JSON.stringify(newCart))
      console.log(item);
    }
  
  
  function updateAmount (amount, item) {    //shoppincart update amount
      item.amount = amount
      const index = cart.findIndex((item => item.id === item.product_id))
      const modifiedCart = Object.assign([...cart], {[index]:item})
      setCart(modifiedCart)
      localStorage.setItem('cart', JSON.stringify(modifiedCart))
      console.log(cart)
  }

  function removeItem(item) {   //shoppincart remove item
      const itemsWithoutRemoved = cart.filter(item => item.product_id !== item.product_id);
      setCart(itemsWithoutRemoved);
      localStorage.setItem('cart',JSON.stringify(itemsWithoutRemoved));
  }

  return (
    <div className='d-flex flex-column min-vh-100'>
      <Infobanner />
      <NavBar cart={cart} />
      <Content addToCart={addToCart} cart={cart} updateAmount={updateAmount} removeItem={removeItem}/>
      <Footer />
    </div>
  )
}

export default App
