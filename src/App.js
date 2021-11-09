import { Switch, Route } from 'react-router';
import './App.css';
import Home from './components/Home';

import Navbar from './components/Navbar';
import Content from './components/Content';

function App() {
  return (
    <div>
      <Navbar />
      <Content />
      <Switch>
        <Route path="/" component={Home} exact />
      </Switch>
    </div>
  );
}

export default App;
