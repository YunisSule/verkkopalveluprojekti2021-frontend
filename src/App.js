import './App.css';
import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router';
import Adminpage from './pages/admin/Adminpage';
import Frontpage from './pages/Frontpage';
import Productpage from './pages/product/Productpage';
import SearchResults from './pages/SearchResults';
import OrderPage from './pages/OrderPage';
import Userpage from './pages/Userpage';
import NavBar from './components/common/NavBar';
import Footer from './components/common/Footer';
import Company from './pages/about/Company';
import Terms from './pages/about/Terms';
import ProductList from './pages/product/ProductList';
import axiosInstance from './axios';

function App() {
  const [cart, setCart] = useState([]);
  const [loggedIn, setloggedIn] = useState(false);

  useEffect(() => {
    axiosInstance
      .get('/auth/logincheck.php', { withCredentials: true })
      .then((response) => {
        if (response.data.loggedin === 'true') {
          setloggedIn(true);
        } else {
          setloggedIn(false);
        }
      })
      .catch((error) => {
        alert(error.response ? error.response.data.error : error);
      });
  }, []);

  useEffect(() => {
    if ('cart' in localStorage) {
      setCart(JSON.parse(localStorage.getItem('cart')));
    }
  }, []);

  function addToCart(item) {
    //Shopping cart add function
    if (cart.some((i) => i.product_id === item.product_id)) {
      const existingItem = cart.filter((i) => i.product_id === item.product_id);
      updateAmount(parseInt(existingItem[0].amount) + 1, item);
      console.log(item);
    } else {
      item['amount'] = 1;
      const newCart = [...cart, item];
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  }

  function updateAmount(amount, item) {
    //Shopping cart amount function
    item.amount = amount;
    const index = cart.findIndex((i) => i.product_id === item.product_id);
    const modifiedCart = Object.assign([...cart], { [index]: item });
    setCart(modifiedCart);
    localStorage.setItem('cart', JSON.stringify(modifiedCart));
    console.log(cart);
  }

  function removeItem(item) {
    //Shopping cart delete function
    const itemsWithoutRemoved = cart.filter((i) => i.product_id !== item.product_id);
    setCart(itemsWithoutRemoved);
    localStorage.setItem('cart', JSON.stringify(itemsWithoutRemoved));
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar cart={cart} logged={loggedIn} />
      <div className="flex-grow-1 mb-5">
        <Switch>
          <Route exact path="/" component={Frontpage} />
          <Route exact path="/product" render={() => <Productpage addToCart={addToCart} />} />
          <Route exact path="/kiekot" render={() => <ProductList title="Kiekot" categoryId="1" />} />
          <Route exact path="/kassit" render={() => <ProductList title="Kassit" categoryId="2" />} />
          <Route exact path="/hakutulokset" component={SearchResults} />
          <Route
            exact
            path="/ostoskori"
            render={() => <OrderPage cart={cart} updateAmount={updateAmount} removeItem={removeItem} />}
          />
          <Route exact path="/omatsivut" component={Userpage} />
          <Route exact path="/hallinta" component={Adminpage} />
          <Route exact path="/yrityksestä" component={Company} />
          <Route exact path="/Käyttöehdot" component={Terms} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
