import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import "./css/Profile.css";
import gold from "../uploads/gold.png";
import silver from "../uploads/silver.png";
import bronze from "../uploads/bronze.png";
import { API } from "../../src/backend";
import ProfileQuestions from "./ProfileQuestions";

const ProfileActivity = (props) => {
  const badges = { gold: 0, silver: 1, bronze: 0 }; // change after getting api call for badges
  const [questions, setQuestions] = useState([]);
  const [answers1, setAnswers] = useState([]);
  const answers = [];

  const getQuestions = async () => {
    return await fetch(`${API}/user/${props.user.id}/questions`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        setQuestions(res);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getQuestions();
    // console.log(props.user);
  }, []);
  return (
    <Container
      style={{ paddingLeft: "2%", paddingRight: "1%", paddingBottom: "15%" }}
    >
      <Row>
        <Col xs={6}>
          <h5>Answers</h5>
          <Card className="Profile_Main_Page_Cards">
            <Card.Body>
              {answers.length === 0 ? (
                <div className="Profile_Main_Page_Card_Content">
                  You have not <a href="">answered</a> any questions
                </div>
              ) : (
                <></>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6}>
          <h5>Questions</h5>
          <Card>
            <Card.Body>
              {questions === [] ? (
                <div className="Profile_Main_Page_BadgesCard_Content">
                  You have not <a href="">asked</a> any questions
                </div>
              ) : (
                questions.map((question, index) => (
                  <div>
                    <ProfileQuestions question={question} />
                    {questions.length !== 1 && index !== question.length - 1 ? (
                      <hr />
                    ) : (
                      <></>
                    )}
                  </div>
                ))
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <br />
      <br />
      <Row>
        <Col xs={6}>
          <h5>Tags</h5>
          <Card className="Profile_Main_Page_Cards">
            <Card.Body>
              <div className="Profile_Main_Page_Card_Content">
                You have not participated in any <a href="">tags</a>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6}>
          <h5>Reputation</h5>
          <Card className="Profile_Main_Page_Cards">
            <Card.Body>
              <div className="Profile_Main_Page_Card_Content">
                You have no recent positive <a href="">reputation changes</a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <br />
      <br />
      <Row>
        <Col xs={12}>
          <h5>Badges</h5>
          {badges.gold === 0 && badges.silver === 0 && badges.bronze === 0 ? (
            <Card
              className="Profile_Main_Page_Cards"
              style={{ height: "100%" }}
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
                  style={{ width: "99%", height: "100%" }}
                >
                  <Card.Body>
                    <Row>
                      <Col xs={4}>
                        <img src={gold} alt="silver" height={75}></img>
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
                            <h6 className="Profile_Main_Page_BadgesCard_Content">
                              gold badge
                            </h6>
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
                  style={{ width: "99%", height: "100%" }}
                >
                  <Card.Body>
                    <Row>
                      <Col xs={4}>
                        <img src={silver} alt="silver" height={78}></img>
                      </Col>
                      <Col xs={8}>
                        {badges.silver === 0 ? (
                          <div className="Profile_Main_Page_BadgesCard_Content">
                            You don’t have a silver badge yet. Write an answer
                            that scores 25 or more to earn your first.
                          </div>
                        ) : (
                          <div>
                            <h2>{badges.silver}</h2>
                            <h6 className="Profile_Main_Page_BadgesCard_Content">
                              silver badge
                            </h6>
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
                  style={{ width: "99%", height: "100%" }}
                >
                  <Card.Body>
                    <Row>
                      <Col xs={4}>
                        <img src={bronze} alt="silver" height={80}></img>
                      </Col>
                      <Col xs={8}>
                        {badges.bronze === 0 ? (
                          <div className="Profile_Main_Page_BadgesCard_Content">
                            You don’t have a bronze badge yet. Write an answer
                            that scores 10 or more to earn your first.
                          </div>
                        ) : (
                          <div>
                            <br />
                            <h2>{badges.bronze}</h2>
                            <h6 className="Profile_Main_Page_BadgesCard_Content">
                              bronze badge
                            </h6>
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
            <Card.Body>
              <div
                className="Profile_Main_Page_Card_Content"
                style={{ paddingTop: "2%" }}
              >
                You have no bookmark <a href="">questions</a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileActivity;
