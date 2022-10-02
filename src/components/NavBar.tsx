import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Link, Outlet } from 'react-router-dom';

const NavBar = () => {
    return(
      <Navbar bg="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">ReReddit</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="Register">Register</Link> | {" "}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Outlet />
    </Navbar>
    )
}

export default NavBar;