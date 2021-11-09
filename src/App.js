import './App.css';
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
  );
}

export default App;
