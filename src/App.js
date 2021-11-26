import './App.css';
import NavBar from './components/Navbar';
import Content from './components/Content';
import Infobanner from './components/Infobanner';
import Footer from './components/Footer';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Infobanner />
      <NavBar />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
