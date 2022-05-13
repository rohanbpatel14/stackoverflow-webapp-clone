import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Companies() {
  return (
    <>
      <Navbar />
      <Container className="Home">
        <Row className="Home_Navbar"></Row>
        <Row className="Home_Sidebar">
          <Col className="Home_Sidebar_Col" md={2}>
            <Sidebar></Sidebar>
          </Col>
          <Col md={10}>
            <Row className="tags_header">
              <Col md={12}>
                <Row>
                  <div className="Home_Questions_Col_Tabs_Text">Companies</div>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Companies;
