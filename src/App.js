import './App.css';
import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router';
import Adminpage from './components/admin/Adminpage';
import Frontpage from './components/Frontpage';
import Productpage from './components/Productpage';
import SearchResults from './components/SearchResults';
import ShowBags from './components/ShowBags';
import ShowDiscs from './components/ShowDisc';
import OrderPage from './components/OrderPage';
import Userpage from './components/Userpage';
import NavBar from './components/Navbar';
import Infobanner from './components/Infobanner';
import Footer from './components/Footer';
import useToken from './components/useToken';

export const IMAGE_PATH = 'http://localhost/verkkopalveluprojekti2021-backend/images/';

function App() {
  const [cart, setCart] = useState([]);
  // const { token, setToken } = useToken()

  useEffect(() => {
    if ('cart' in localStorage) {
      setCart(JSON.parse(localStorage.getItem('cart')));
    }
  }, []);

  function addToCart(item) {      //Shopping cart add function
     if (cart.some((i) => i.product_id === item.product_id)) {    
      const existingItem = cart.filter((i) => i.product_id === item.product_id)
      updateAmount(parseInt(existingItem[0].amount) + 1, item)
      console.log(item);
    } else {   
    item['amount'] = 1;
    const newCart = [...cart, item];
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  }
}

  function updateAmount(amount, item) {     //Shopping cart amount function
    item.amount = amount;
    const index = cart.findIndex((i) => i.product_id === item.product_id);
    const modifiedCart = Object.assign([...cart], { [index]: item });
    setCart(modifiedCart);
    localStorage.setItem('cart', JSON.stringify(modifiedCart));
    console.log(cart);
  }

  function removeItem(item) {     //Shopping cart delete function
    const itemsWithoutRemoved = cart.filter((i) => i.product_id !== item.product_id);
    setCart(itemsWithoutRemoved);
    localStorage.setItem('cart', JSON.stringify(itemsWithoutRemoved));
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Infobanner />
      <NavBar cart={cart} />
      <div className="flex-grow-1 mb-5">
        <Switch>
          <Route path="/" component={Frontpage} exact />
          <Route path="/product" render={() => <Productpage addToCart={addToCart} />} />
          <Route path="/kiekot" component={ShowDiscs} />
          <Route path="/kassit" component={ShowBags} />
          <Route path="/hakutulokset" component={SearchResults} />
          <Route
            path="/ostoskori"
            render={() => <OrderPage cart={cart} updateAmount={updateAmount} removeItem={removeItem} />}
          />
          <Route path="/omatsivut" component={Userpage} exact />
          <Route path="/hallinta" component={Adminpage} exact />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
