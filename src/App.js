import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";

import Signin from "./components/Signin/Signin";
import Login from "./components/Login/Login";
import Voting from "./components/Voting/Voting";

const App = () => {
  const navigate = useNavigate();

  const signout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      {/* Navigation Bar */}
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <NavLink className="navbar-brand" to="/">
            Voting
          </NavLink>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {localStorage.getItem("isAuth") === "true" ? (
              <Nav className="ms-auto">
                <button className="btn btn-warning" onClick={signout}>
                  Signout
                </button>
              </Nav>
            ) : (
              <Nav className="ms-auto">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
                <NavLink className="nav-link" to="/signin">
                  Signup
                </NavLink>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Voting />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </>
  );
};

export default App;
