import { Link } from 'react-router-dom';
import Logo from '../images/Fribashoplogo.svg';
import React from 'react';
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Collapse,
  NavItem,
  Nav,
  NavLink,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
} from 'reactstrap';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import Shoppingcart from './Shoppingcart';
import Login from './Login';
import axiosInstance from '../axios';

export default function NavBar({ cart }) {
  const [openLoginModal, setOpenLoginModal] = useState(false)
  const loginModalShow = () => setOpenLoginModal(true)
  const loginModalHide = () => setOpenLoginModal(false)
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  return (
    <div>
      <Navbar color='dark' expand='md' dark>
        <NavbarBrand href='/' className='d-none d-md-block'>
          <img src={Logo} alt='Logo' />
        </NavbarBrand>
        <NavbarToggler
          onClick={function noRefCheck () {
            setIsOpen(!isOpen)
          }}
        />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='me-auto' navbar>
            <NavItem>
              <NavLink>
                <Link className='nav-link' to='/'>
                  Etusivu
                </Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link className='nav-link' to='/kiekot'>
                  Kiekot
                </Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link className='nav-link' to='/kassit'>
                  Kassit
                </Link>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
        <div id='navItems'>
          <NavLink className='searchBox'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              fill='currentColor'
              className='bi bi-search'
              viewBox='0 0 16 16'
              color='white'
              onClick={function noRefCheck () {
                setSearchOpen(!searchOpen)
              }}
            >
              <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
            </svg>
            <Collapse isOpen={searchOpen} horizontal>
              <form className='searchBox'>
                <Input value={query} onChange={e => setQuery(e.target.value)} />
                <Link
                  to={{ pathname: '/hakutulokset', state: { query: query } }}
                >
                  <Button>hae</Button>
                </Link>
              </form>
            </Collapse>
          </NavLink>
          <NavLink>
            <Shoppingcart cart={cart} />
          </NavLink>
          <NavLink>
            <Link to="/omatsivut">
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                fill='currentColor'
                className='bi bi-person'
                viewBox='0 0 16 16'
                color='white'
              >
                <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z' />
              </svg>
            </Link>
          </NavLink>
          <NavLink>
            <Link to='/hallinta'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                class='bi bi-gear'
                viewBox='0 0 16 16'
                color='white'
              >
                <path d='M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z' />
                <path d='M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z' />
              </svg>
            </Link>
          </NavLink>
          <NavItem>
            <Button
              id='login-modal-toggle'
              color='none'
              onClick={() => loginModalShow()}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                fill='currentColor'
                color='white'
                className='bi bi-box-arrow-in-right'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z'
                />
                <path
                  fillRule='evenodd'
                  d='M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z'
                />
              </svg>
            </Button>
            {openLoginModal ? (
              <Login onHide={loginModalHide} />
            ) : null}
          </NavItem>
        </div>
      </Navbar>
    </div>
  )
}
