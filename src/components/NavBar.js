import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const NavBar = props => {

  const authState = useSelector(state => {
    return state.auth
  })

  if (authState.isLoggedIn)
    return (
      <div>
        <Navbar expand="md" variant="light">
          <Navbar.Brand href="/">Logo</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse className="xjustify-content-end" id="basic-navbar-nav">
            <Nav className="mr-auto ">
              <Nav.Link href="">Home</Nav.Link>              
              <Nav.Link href="/profile">Your Profile</Nav.Link>
            </Nav>
         
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  else
    return (
      <div>
        <Navbar expand="md" variant="dark">
          <Navbar.Brand href="/">SmartTicket Logo</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse className="xjustify-content-end" id="basic-navbar-nav">
            <Nav className="mr-auto ">
              <Nav.Link href="">Home</Nav.Link>
            </Nav>

          </Navbar.Collapse>
        </Navbar>
      </div>
    );
};

NavBar.propTypes = {

};

export default NavBar;