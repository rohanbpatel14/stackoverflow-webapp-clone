import React, { useEffect } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import logo from "../uploads/Profile_Page.png";
import gold from "../uploads/gold.png";
import silver from "../uploads/silver.png";
import bronze from "../uploads/bronze.png";
import "./css/Home.css";
import "./css/Profile.css";

const ProfileMain = ({ user }) => {
  const badges = { gold: 0, silver: 1, bronze: 0 };
  useEffect(() => {
    // console.log(user.badges.gold);
  });
  return (
    <>
      {user && (
        <Container style={{ paddingLeft: "2%", paddingRight: "1%" }}>
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
                      <div>{user.reputation}</div>
                      <div className="Profile_User_Info">reputation</div>
                    </Col>
                    <Col>
                      <div>{user.reach}</div>
                      <div className="Profile_User_Info">reached</div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div>{user.answer_count}</div>
                      <div className="Profile_User_Info">answers</div>
                    </Col>
                    <Col>
                      <div>{user.question_count}</div>
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
                    Your about me section is currently blank. Would you like to
                    add
                    <br />
                    one? <a href="/editProfile">Edit profile</a>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <br />
          <Row style={{ height: "28%" }}>
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

              {badges.gold === 0 &&
              badges.silver === 0 &&
              badges.bronze === 0 ? (
                <Card
                  className="Profile_Main_Page_Cards"
                  style={{ height: "70%" }}
                >
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
                          <Col xs={5}>
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
                          <Col xs={5}>
                            <img src={silver} alt="silver" height={70}></img>
                          </Col>
                          <Col>
                            {badges.silver === 0 ? (
                              <div className="Profile_Main_Page_BadgesCard_Content">
                                You don’t have a silver badge yet. Write an
                                answer that scores 25 or more to earn your
                                first.
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
                          <Col xs={5}>
                            <img src={bronze} alt="silver" height={70}></img>
                          </Col>
                          <Col>
                            {badges.bronze === 0 ? (
                              <div className="Profile_Main_Page_BadgesCard_Content">
                                You don’t have a bronze badge yet. Write an
                                answer that scores 10 or more to earn your
                                first.
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
                    <br /> Your most helpful questions, answers and tags will
                    appear here. <br />
                    Start by <a href="">answering a question</a> or{" "}
                    <a href="">selecting tags</a> that match topics you’re{" "}
                    <br />
                    interested in.
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default ProfileMain;
