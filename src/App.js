import { Switch, Route } from 'react-router';
import './App.css';
import Home from './components/Home';

function App() {
  return (
    <>
    
      <Switch>
        <Route path="/" component={Home} exact />
      </Switch>
    
    </>
  );
}

export default App;
