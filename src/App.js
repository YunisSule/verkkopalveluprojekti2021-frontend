import { Switch, Route } from 'react-router';
import './App.css';
<<<<<<< HEAD
import Home from './components/Home';

function App() {
  return (
    <>
    
      <Switch>
        <Route path="/" component={Home} exact />
      </Switch>
    
    </>
=======
import Navbar from './components/Navbar';
import Content from './components/Content';
import Infobanner from './components/Infobanner';

function App() {
  return (
    <div>
      <Infobanner />
      <Navbar />
      <Content />
    </div>
>>>>>>> 8e4cbe0571471355729c14b31c418536c40c3b6e
  );
}

export default App;
