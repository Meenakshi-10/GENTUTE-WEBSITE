import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import {Container, Nav, Navbar } from "react-bootstrap";

function Navigation() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">GENTUTE</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/custom_experiment">Custom Experiment</Nav.Link>
            <Nav.Link href="/all_experiment">Salt Analysis</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      
    </>
  );
}

export default Navigation;