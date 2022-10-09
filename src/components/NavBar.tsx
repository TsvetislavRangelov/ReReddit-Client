import { Nav, Navbar, Form, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return(
      <Navbar bg="dark" expand="lg">
      <Container>
        <Navbar.Brand>
          <NavLink to="/">
            ReReddit
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <NavLink to="Register">
            Register
          </NavLink>
          </Nav>
        </Navbar.Collapse>
        <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Nav.Item>
          <NavLink className="text-xl " to="Login">Login</NavLink>
          </Nav.Item>
      </Container>
    </Navbar>
    )
}

export default NavBar;