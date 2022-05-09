import React from "react";
import "./css/Profile.css";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import logo from "../uploads/Profile_Page.png";

const ProfileMain = ({ user }) => {
  return (
    <Container style={{ paddingLeft: "2%" }}>
      <Row>
        <Col xs={3}>
          <h5>Stats</h5>
          <Card
            className="Profile_Main_Page_Cards"
            style={{ background: "white" }}
          >
            <Card.Body>
              <Row>
                <Col>
                  <div>{user.Reputation}</div>
                  <div className="Profile_User_Info">reputation</div>
                </Col>
                <Col>
                  <div>{user.Reach}</div>
                  <div className="Profile_User_Info">reached</div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div>{user.AnswerCount}</div>
                  <div className="Profile_User_Info">answers</div>
                </Col>
                <Col>
                  <div>{user.QuestionCount}</div>
                  <div className="Profile_User_Info">question</div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={9}>
          <h5>About</h5>
          <Card className="Profile_Main_Page_Cards">
            <Card.Body>
              <div className="Profile_Main_Page_Card_Content">
                Your about me section is currently blank. Would you like to add
                <br />
                one? <a href="/editProfile">Edit profile</a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <br />
      <Row style={{ height: "20%" }}>
        <Col xs={3}>
          <h5>Communities</h5>
          <Card
            className="Profile_Main_Page_Cards"
            style={{ height: "40%", background: "white" }}
          >
            <Card.Body></Card.Body>
          </Card>
        </Col>
        <Col xs={9}>
          <h5>Badges</h5>
          <Card className="Profile_Main_Page_Cards" style={{ height: "60%" }}>
            <Card.Body>
              <div className="Profile_Main_Page_Card_Content">
                You have not earned any <a href="">badges</a>.
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row style={{ height: "100%" }}>
        <Col xs={3}></Col>
        <Col xs={9}>
          <h5>Posts</h5>
          <Card className="Profile_Main_Page_Cards">
            <Card.Body>
              <div className="Profile_Main_Page_Card_Content">
                <img src={logo} alt="profile" height={150}></img>
                <br />
                <br />
                Just getting started? Try answering a question!
                <br />
                <br /> Your most helpful questions, answers and tags will appear
                here. <br />
                Start by <a href="">answering a question</a> or{" "}
                <a href="">selecting tags</a> that match topics you’re <br />
                interested in.
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileMain;
