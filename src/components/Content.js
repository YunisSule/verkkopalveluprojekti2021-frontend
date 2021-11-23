import { Switch, Route } from 'react-router';
import Frontpage from './Frontpage';
import Productpage from './Productpage';
import SearchResults from './SearchResults';
import ShowBags from './ShowBags';
import ShowDiscs from './ShowDisc';
import Userpage from './Userpage';

export default function Content() {
  return (
    <div>
      <Switch>
        <Route path="/" component={Frontpage} exact />
        <Route path="/product" component={Productpage} exact />
        <Route path="/kiekot" component={ShowDiscs} />
        <Route path="/kassit" component={ShowBags} />
        <Route path="/hakutulokset" component={SearchResults} />
        <Route path="/omatsivut" component={Userpage} />
      </Switch>
    </div>
  );
}
