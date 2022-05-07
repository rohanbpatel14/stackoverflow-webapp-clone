import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Sidebar from "./Sidebar";

const Profile = () => {
  const user = {
    id: 1, // int
    Name: "Siddhant", // varchar
    Email: "siddhant@gmail.com", // varchar
    Password: "", // varcher
    UserType: 1, // int
    Picture: "", // varchar
    CreatedAt: "2022-05-08", // date
    LastSeen: "2022-05-08", // date
    Location: "USA", // varcher
    Reputation: 100, // int
    QuestionCount: 5, // int
    AnswerCount: 2, // int
    Reach: 2, // int
    About: "Lorem Ipsum", // varchar
  };
  return (
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
                <div className="Home_Questions_Col_Tabs_Text"></div>
              </Row>
              Profile
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
