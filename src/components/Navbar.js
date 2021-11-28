import { Link } from 'react-router-dom';
import Logo from '../images/Fribashoplogo.svg';
import React from 'react';
import { Navbar, NavbarToggler, NavbarBrand, Collapse, NavItem, Nav, NavLink, Input, Button } from 'reactstrap';
import { useState } from 'react';
import { useLocation } from 'react-router';
import Shoppingcart from './Shoppingcart';

export default function NavBar({cart}) {
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
            <Shoppingcart cart={cart}/>
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
