import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import "./css/Profile.css";
import goldimg from "../uploads/gold.png";
import silverimg from "../uploads/silver.png";
import bronzeimg from "../uploads/bronze.png";
import { API } from "../../src/backend";
import ProfileQuestions from "./ProfileQuestions";
import ProfileAnswers from "./ProfileAnswers";
import ProfileBookmarks from "./ProfileBookmarks";
import ProfileTags from "./ProfileTags";
import ProfileReputation from "./ProfileReputation";

const ProfileActivity = (props) => {
  const [gold, setGold] = useState(-3); // change after getting api call for badges
  const [silver, setSilver] = useState(1);
  const [bronze, setBronze] = useState(1);
  const [questions1, setQuestions] = useState([]);
  const [answers1, setAnswers] = useState([]);

  const questions = [
    {
      viewCount: 1,
      body: "Find objects between two dates MongoDB",
      answers: [],
      __v: 1,
      tags: ["mongodb"],
    },
    {
      viewCount: 1,
      body: "See if nested array of objects contains value | MongoDB",
      answers: [],
      __v: 1,
      tags: ["javascript", "mongodb"],
    },
    {
      viewCount: 1,
      body: "get records from current date mongodb [duplicate]",
      answers: [1],
      __v: 1,
      tags: ["mongodb"],
    },
  ];

  const answers = [
    {
      __v: 2,
      accepted: true,
      tags: ["javascript", "mongodb"],
      body: "Find objects between two dates MongoDB",
    },
    {
      __v: 7,
      accepted: true,
      tags: ["python"],
      body: "How to configure Lasso Regression",
    },
  ];

  const tags = [
    {
      name: "python",
      posts: 7,
      score: 400,
    },
    {
      name: "javascript",
      posts: 5,
      score: 350,
    },
    {
      name: "mongodb",
      posts: 6,
      score: 375,
    },
  ];

  const bookmarks = [
    {
      __v: 2,
      accepted: true,
      tags: ["javascript", "mongodb"],
      body: "How to vectorize such an algorithm in python?",
      bookmarks: 4,
      answers: [1, 2],
    },
    {
      __v: 7,
      accepted: true,
      tags: ["python"],
      body: "Why do we need numpy?",
      bookmarks: 7,
      answers: [1, 2, 3],
    },
  ];

  const reputation = [
    {
      body: "Find objects between two dates MongoDB",
      score: 10,
      event: "upvote",
    },
    {
      body: "See if nested array of objects contains value | MongoDB",
      score: 10,
      event: "upvote",
    },
    {
      body: "get records from current date mongodb [duplicate]",
      score: 10,
      event: "upvote",
    },
  ];

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

  const countBadges = () => {
    if (props.badges && props.badges.length !== 0) {
      JSON.parse(props.badges).forEach((badge) => {
        if (badge.badge_type === "gold") {
          setGold((gold) => gold + 1);
        }
        if (badge.badge_type === "silver") {
          setSilver((silver) => silver + 1);
        }
        if (badge.badge_type === "bronze") {
          setBronze((bronze) => bronze + 1);
        }
      });
    }
  };

  useEffect(() => {
    countBadges();
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
                answers.map((answer, index) => (
                  <div>
                    <ProfileAnswers answer={answer} />
                    {answers.length !== 1 ? <hr /> : <></>}
                  </div>
                ))
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6}>
          <h5>Questions</h5>
          <Card className="Profile_Main_Page_Cards">
            <Card.Body>
              {questions.length === 0 ? (
                <div className="Profile_Main_Page_Card_Content">
                  You have not <a href="">asked</a> any questions
                </div>
              ) : (
                questions.map((question, index) => (
                  <div>
                    <ProfileQuestions question={question} />
                    {questions.length !== 1 ? <hr /> : <></>}
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
              {tags.length === 0 ? (
                <div className="Profile_Main_Page_Card_Content">
                  You have not participated in any <a href="">tags</a>
                </div>
              ) : (
                tags.map((tag, index) => (
                  <div>
                    <ProfileTags tag={tag} />
                  </div>
                ))
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6}>
          <h5>Reputation</h5>
          <Card className="Profile_Main_Page_Cards">
            <Card.Body>
              {reputation.length === 0 ? (
                <div className="Profile_Main_Page_Card_Content">
                  You have no recent positive <a href="">reputation changes</a>
                </div>
              ) : (
                reputation.map((reputation, index) => (
                  <div>
                    <ProfileReputation reputation={reputation} />
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
        <Col xs={12}>
          <h5>Badges</h5>
          {gold === 0 && silver === 0 && bronze === 0 ? (
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
                        <img src={goldimg} alt="silver" height={75}></img>
                      </Col>
                      <Col xs={7}>
                        {gold === 0 ? (
                          <div className="Profile_Main_Page_BadgesCard_Content">
                            You don’t have a gold badge yet. Write an answer
                            that scores 100 or more to earn your first.
                          </div>
                        ) : (
                          <div>
                            <h2>{gold}</h2>
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
                        <img src={silverimg} alt="silver" height={78}></img>
                      </Col>
                      <Col xs={8}>
                        {silver === 0 ? (
                          <div className="Profile_Main_Page_BadgesCard_Content">
                            You don’t have a silver badge yet. Write an answer
                            that scores 25 or more to earn your first.
                          </div>
                        ) : (
                          <div>
                            <h2>{silver}</h2>
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
                        <img src={bronzeimg} alt="silver" height={80}></img>
                      </Col>
                      <Col xs={8}>
                        {bronze === 0 ? (
                          <div className="Profile_Main_Page_BadgesCard_Content">
                            You don’t have a bronze badge yet. Write an answer
                            that scores 10 or more to earn your first.
                          </div>
                        ) : (
                          <div>
                            <h2>{bronze}</h2>
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
              {bookmarks.length === 0 ? (
                <div className="Profile_Main_Page_Card_Content">
                  You have no bookmark <a href="">questions</a>
                </div>
              ) : (
                bookmarks.map((bookmark, index) => (
                  <div>
                    <ProfileBookmarks bookmark={bookmark} />
                    {bookmarks.length !== 1 ? <hr /> : <></>}
                  </div>
                ))
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileActivity;
