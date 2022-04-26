import React from "react";
import { Button, Col, Container, Nav, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function NavBar() {
  const history = useHistory();
  const handleLoginClick = () => history.push('/login')
  const handleSignupClick = () => history.push('/signup')
  return (
    // <div>Navbar</div>
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Col md={{ span: 3, offset: 1 }}>
            <Navbar.Brand style={{}} href="#">
              <svg width="2em" height="2em" viewBox="0 0 32 37" fill="none">
                <path d="M26 33v-9h4v13H0V24h4v9h22z" fill="#BCBBBB" />
                <path
                  d="M21.5 0l-2.7 2 9.9 13.3 2.7-2L21.5 0zM26 18.4L13.3 7.8l2.1-2.5 12.7 10.6-2.1 2.5zM9.1 15.2l15 7 1.4-3-15-7-1.4 3zm14 10.79l.68-2.95-16.1-3.35L7 23l16.1 2.99zM23 30H7v-3h16v3z"
                  fill="#F48024"
                />
              </svg>
              &nbsp;&nbsp;Stackoverflow
            </Navbar.Brand>
          </Col>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="container-fluid"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
               <Col md={{ span: 3, offset: 8 }}>
              <Button variant="outline-primary" onClick={handleLoginClick}>Log in</Button>
              &nbsp;
              <Button variant="outline-primary" onClick={handleSignupClick}>Sign up</Button>
              </Col>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;