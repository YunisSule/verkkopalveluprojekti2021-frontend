import './App.css';
import Navbar from './components/Navbar';
import Content from './components/Content';
import Infobanner from './components/Infobanner';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Infobanner />
      <Navbar />
      <Content />
      <Footer />
    </>
  );
}

export default App;
