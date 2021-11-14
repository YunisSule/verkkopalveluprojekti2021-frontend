import { Switch, Route } from 'react-router';
import Frontpage from './Frontpage';
import Productpage from './Productpage';

export default function Content() {
  return (
    <div>
      <Switch>
        <Route path="/" component={Frontpage} exact />
        <Route path="/product" component={Productpage} exact />
      </Switch>
    </div>
  );
}
