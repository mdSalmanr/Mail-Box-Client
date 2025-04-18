import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link } from 'react-router-dom';

const NavBarComponent= () => {
 
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Mail Box Client</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            
            <Link to='/' ><Nav.Link>Home</Nav.Link></Link>
            <Nav.Link href="#link">Link</Nav.Link>        
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}



export default NavBarComponent;