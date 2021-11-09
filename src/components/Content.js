import { Switch, Route } from 'react-router';
import Frontpage from './Frontpage';

export default function Content() {
  return (
    <div>
      <Switch>
        <Route path="/" component={Frontpage} exact />
      </Switch>
    </div>
  );
}
