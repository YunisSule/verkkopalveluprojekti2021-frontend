import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-black">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/components/Frontpage">
              Etusivu
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="">
              Kiekot
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="">
              Kassit
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="">
              Asusteet
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
