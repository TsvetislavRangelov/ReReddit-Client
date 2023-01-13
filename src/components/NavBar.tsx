import React, { useState } from "react";
import { Nav, Navbar, Form, Button, DropdownButton } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { NavLink, redirect, useNavigate } from "react-router-dom";
import { AuthContextType } from "../api/types/AuthTyped";
import { AuthContext } from "../context/AuthProvider";
import { disconnectClient } from "../websocket/stompClient";

const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();
  const { auth, saveAuth } = React.useContext(AuthContext) as AuthContextType;
  const logout = async () => {
    saveAuth({
      id: 0,
      username: "",
      roles: [""],
      accessToken: "",
      refreshToken: "",
    });
    disconnectClient();
    navigate("/Login");
  };

  const handleChange = (e: any) => {
    setSearchTerm(e.target.value);
  }
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
            placeholder="Search Posts"
            className="me-2"
            aria-label="Search"
            value={searchTerm}
            onChange={handleChange}
          />
          <Button variant="outline-success" onClick={() => {
            if(searchTerm !== ""){
              navigate(`/search/${searchTerm}`)
            }
          }}>Search</Button>
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
              <div>
                <DropdownButton id="dropdown-basic-button" title="Profile">
                  <DropdownItem>
                    <NavLink
                      className="text-xl no-underline ml-4 text-black"
                      to={`/inbox/${auth.id}`}
                    >
                      Inbox
                    </NavLink>
                  </DropdownItem>

                  <DropdownItem>
                    {" "}
                    <NavLink
                      className="text-xl no-underline text-black ml-4"
                      to={`/user/${auth.id}`}
                    >
                      Profile
                    </NavLink>
                  </DropdownItem>
                  <DropdownItem className="text-black">
                    <NavLink
                      className="text-xl no-underline text-black ml-4"
                      to="Login"
                      onClick={logout}
                    >
                      Log Out
                    </NavLink>
                  </DropdownItem>
                  {auth.roles.includes('ADMIN') ? (
                    <DropdownItem className="text-black">
                      <NavLink
                      to="AdminDashboard" 
                      className="text-xl no-underline text-black ml-4">
                        Dashboard
                      </NavLink>
                    </DropdownItem>
                  ) : (
                    ''
                  )}
                </DropdownButton>
              </div>
            )}
          </div>
        </Nav.Item>
      </Container>
    </Navbar>
  );
};

export default NavBar;
