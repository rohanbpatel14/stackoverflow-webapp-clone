import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import "./css/Profile.css";
import gold from "../uploads/gold.png";
import silver from "../uploads/silver.png";
import bronze from "../uploads/bronze.png";

const ProfileActivity = () => {
  const badges = { gold: 0, silver: 1, bronze: 0 };
  return (
    <Container style={{ paddingLeft: "2%", paddingRight: "1%" }}>
      <Row>
        <Col xs={6}>
          <h5>Answers</h5>
          <Card className="Profile_Main_Page_Cards">
            <Card.Body></Card.Body>
          </Card>
        </Col>
        <Col xs={6}>
          <h5>Questions</h5>
          <Card className="Profile_Main_Page_Cards">
            <Card.Body></Card.Body>
          </Card>
        </Col>
      </Row>
      <br />
      <br />
      <Row>
        <Col xs={6}>
          <h5>Tags</h5>
          <Card className="Profile_Main_Page_Cards">
            <Card.Body></Card.Body>
          </Card>
        </Col>
        <Col xs={6}>
          <h5>Reputation</h5>
          <Card className="Profile_Main_Page_Cards">
            <Card.Body></Card.Body>
          </Card>
        </Col>
      </Row>
      <br />
      <br />
      <Row>
        <Col xs={12}>
          <h5>Badges</h5>
          {badges.gold === 0 && badges.silver === 0 && badges.bronze === 0 ? (
            <Card className="Profile_Main_Page_Cards" style={{ height: "70%" }}>
              <Card.Body>
                <div className="Profile_Main_Page_Card_Content">
                  <br />
                  You have not earned any <a href="">badges</a>.
                </div>
              </Card.Body>
            </Card>
          ) : (
            <Row xs={3}>
              <Col>
                <Card
                  className="Profile_Main_Page_Cards"
                  style={{ width: "99%", height: "90%" }}
                >
                  <Card.Body>
                    <Row>
                      <Col xs={4}>
                        <img src={gold} alt="silver" height={70}></img>
                      </Col>
                      <Col xs={7}>
                        {badges.gold === 0 ? (
                          <div className="Profile_Main_Page_BadgesCard_Content">
                            You don’t have a gold badge yet. Write an answer
                            that scores 100 or more to earn your first.
                          </div>
                        ) : (
                          <div>
                            <h2>{badges.gold}</h2>
                            <h6>gold badge</h6>
                          </div>
                        )}
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card
                  className="Profile_Main_Page_Cards"
                  style={{ width: "99%", height: "90%" }}
                >
                  <Card.Body>
                    <Row>
                      <Col xs={4}>
                        <img src={silver} alt="silver" height={70}></img>
                      </Col>
                      <Col>
                        {badges.silver === 0 ? (
                          <div className="Profile_Main_Page_BadgesCard_Content">
                            You don’t have a silver badge yet. Write an answer
                            that scores 25 or more to earn your first.
                          </div>
                        ) : (
                          <div>
                            <h2>{badges.silver}</h2>
                            <h6>silver badge</h6>
                          </div>
                        )}
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card
                  className="Profile_Main_Page_Cards"
                  style={{ width: "99%", height: "90%" }}
                >
                  <Card.Body>
                    <Row>
                      <Col xs={4}>
                        <img src={bronze} alt="silver" height={70}></img>
                      </Col>
                      <Col>
                        {badges.bronze === 0 ? (
                          <div className="Profile_Main_Page_BadgesCard_Content">
                            You don’t have a bronze badge yet. Write an answer
                            that scores 10 or more to earn your first.
                          </div>
                        ) : (
                          <div>
                            <br />
                            <h2>{badges.bronze}</h2>
                            <h6>bronze badge</h6>
                          </div>
                        )}
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs={12}>
          <h5>Bookmarks</h5>
          <Card className="Profile_Main_Page_Cards">
            <Card.Body></Card.Body>
          </Card>
        </Col>
      </Row>
      <br />
      <br />
      <br />
    </Container>
  );
};

export default ProfileActivity;
