import { Link } from 'react-router-dom';
import Logo from '../images/Fribashoplogo.svg';
import React from 'react';
import { Navbar, NavbarToggler, NavbarBrand, Collapse, NavItem, Nav, NavLink, Input, Button } from 'reactstrap';
import { useState } from 'react';
import { useLocation } from 'react-router';

export default function NavBar() {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  function refreshPage() {
    if (location.pathname === '/hakutulokset') {
      window.location.reload();
    }
  }

  return (
    <div>
      <Navbar color="dark" expand="md" dark>
        <NavbarBrand href="/" className="d-none d-md-block">
          <img src={Logo} alt="Logo" />
        </NavbarBrand>
        <NavbarToggler
          onClick={function noRefCheck() {
            setIsOpen(!isOpen);
          }}
        />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink className="nav-link" to="/">
                <Link className="nav-link" to="/">
                  Etusivu
                </Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link className="nav-link" to="/kiekot">
                  Kiekot
                </Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link className="nav-link" to="/kassit">
                  Kassit
                </Link>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
        <div id="navItems">
          <NavLink className="searchBox">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
              color="white"
              onClick={function noRefCheck() {
                setSearchOpen(!searchOpen);
              }}
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
            <Collapse isOpen={searchOpen} horizontal>
              <form className="searchBox">
                <Input value={query} onChange={(e) => setQuery(e.target.value)} />
                <Link to={{ pathname: '/hakutulokset', state: { query: query } }} onClick={refreshPage}>
                  <Button>hae</Button>
                </Link>
              </form>
            </Collapse>
          </NavLink>
          <NavLink>
            <Link to="/ostoskori">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-basket" viewBox="0 0 16 16" color="white">
                <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z" />
              </svg>
            </Link>
          </NavLink>
          <NavLink>
            <Link to="/kirjautuminen">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16" color="white">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
              </svg>
            </Link>
          </NavLink>
        </div>
      </Navbar>
    </div>
  );
}
