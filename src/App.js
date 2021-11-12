import './App.css';
import NavBar from './components/Navbar';
import Content from './components/Content';
import Infobanner from './components/Infobanner';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Infobanner />
      <NavBar />
      <Content />
      <Footer />
    </>
  );
}

export default App;
