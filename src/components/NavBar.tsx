import React from "react";
import { Nav, Navbar, Form, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";
import { AuthContextType } from "../api/types/AuthTyped";
import { AuthContext } from "../context/AuthProvider";

const NavBar = () => {
  const { auth, saveAuth } = React.useContext(AuthContext) as AuthContextType;
  return (
    <Navbar bg="dark" expand="lg">
      <Container>
        <Navbar.Brand>
          <NavLink className="no-underline text-xxl text-white" to="/">
            ReReddit
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
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
          <div className="d-flex pl-4 justify-between">
            {!auth?.username ? (
              <>
                <NavLink
                  className="text-xl no-underline text-white ml-4"
                  to="Login"
                >
                  Login
                </NavLink>
                <NavLink
                  className="text-xl no-underline text-white ml-4 "
                  to="Register"
                >
                  Register
                </NavLink>
              </>
            ) : (
              <NavLink
                className="text-xl no-underline text-white ml-4"
                to="Login"
              >
                Log Out
              </NavLink>
            )}
          </div>
        </Nav.Item>
      </Container>
    </Navbar>
  );
};

export default NavBar;
