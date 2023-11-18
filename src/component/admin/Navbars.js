import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

import logo from "../../assets/images/ipbLogo.png";
function Navbars() {
  return (
    <div>
      {/* <img src={logo} alt="Logo" style={{ height: "7rem", float: "left" }} /> */}
      <Navbar
        expand="lg"
        className="mt-5 rounded"
        style={{
          backgroundColor: "rgb(194, 24, 7)",
          width: "80%",
          margin: "auto",
          padding: "15px", // Add padding for a more rounded look
          borderRadius: "15px", // Increase border-radius for more roundness
        }}
      >
        <Container>
          <Navbar.Brand as={Link} to="/" style={{ color: "white" }}>
            IPB
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <Nav.Link as={Link} to="/admin" style={{ color: "white" }}>
                PROMO
              </Nav.Link>
              <Nav.Link as={Link} to="/commande" style={{ color: "white" }}>
                Commande
              </Nav.Link>
              <Nav.Link as={Link} to="/Prix" style={{ color: "white" }}>
                Modification des Prix
              </Nav.Link>
              <Nav.Link
                style={{ color: "white" }}
                as={Link}
                to="/Ouvrages Medicaux"
                onClick={() => {
                  localStorage.setItem("option", "Ouvrages Medicaux");
                }}
              >
                Ouvrages Medicaux
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/Concours ECN Tunisie"
                style={{ color: "white " }}
              >
                Concours ECN Tunisie
              </Nav.Link>

              <NavDropdown
                title={
                  <span style={{ color: "white" }}>Documentation Extarnat</span>
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item
                  onClick={() => (window.location.href = "/Sfax")}
                >
                  Sfax
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => (window.location.href = "/Sousse")}
                >
                  Sousse
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => (window.location.href = "/Tunis")}
                >
                  Tunis
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => (window.location.href = "/Monastir")}
                >
                  Monastir
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navbars;
