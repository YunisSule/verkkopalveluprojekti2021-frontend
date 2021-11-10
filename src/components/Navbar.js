import { Link } from 'react-router-dom';
import Logo from '../images/FribashopLogoNav.jpg';

export default function Navbar() {
  return (
    <div>
      <nav id="navbar" className="navbar navbar-expand-sm navbar-dark bg-black">
        <img src={Logo} alt="Logo" />
        <ul id="navbar-nav" className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Etusivu
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/kiekot">
              Kiekot
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/kassit">
              Kassit
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/asusteet">
              Asusteet
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
