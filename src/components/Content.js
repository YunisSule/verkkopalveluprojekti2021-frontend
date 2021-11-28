import { Switch, Route } from 'react-router';
import Adminpage from './Adminpage';
import Frontpage from './Frontpage';
import Productpage from './Productpage';
import SearchResults from './SearchResults';
import ShowBags from './ShowBags';
import ShowDiscs from './ShowDisc';
import OrderPage from './OrderPage';
import Userpage from './Userpage';

export default function Content({addToCart, cart, updateAmount}) {
  return (
    <div className="flex-grow-1 mb-5">
      <Switch>
        <Route path="/" component={Frontpage} exact />
        <Route path="/product" render={() => <Productpage addToCart={addToCart} />}  />
        <Route path="/kiekot" component={ShowDiscs} />
        <Route path="/kassit" component={ShowBags} />
        <Route path="/hakutulokset" component={SearchResults} />
        <Route path='/ostoskori' render={() => <OrderPage cart={cart} updateAmount={updateAmount}/>} />
        <Route path="/omatsivut" component={Userpage} />
        <Route path="/hallinta" component={Adminpage} exact />
      </Switch>
    </div>
  );
}
