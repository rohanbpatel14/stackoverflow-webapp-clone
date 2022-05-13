import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { useParams, useHistory } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import AnswerQuestion from "./AnswerQuestion";
import { API } from "../../src/backend";
import "./css/QuestionOverview.css";
import AddComment from "./AddComment";
import Bookmark from "./Bookmark";
import Navbar from "./Navbar";
import { isAutheticated } from "../auth/helper/authapicalls";
import QuestionAnswer from "./QuestionAnswer";
// import HistoryIcon from "@material-ui/icons/History";
const { user } = isAutheticated();

function QuestionOverview({ match }) {
  const history = useHistory();
  const params = useParams();
  const [questionPaper, setQuestionPaper] = useState([]);
  const [bookmarkColor, setBookmarkColor] = useState("darkgray");
  const [vote, setVote] = useState(0);

  const getQuestionPaperDetails = (questionId) => {
    return fetch(`${API}/posts/${questionId}`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        setQuestionPaper(res);
        setVote(res.score);
      })
      .catch((err) => console.log(err));
  };

  const voteQuestion = (val) => {
    return fetch(`${API}/posts/voteQuestion`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
        questionId: params.questionId,
        value: val,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        setVote(vote + val);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getQuestionPaperDetails(params.questionId);
  }, [params.questionId]);
  return (
    <>
      <Navbar />
      <Container className="Home">
        <Row className="Home_Sidebar">
          <Col className="Home_Sidebar_Col" md={2}>
            <Sidebar></Sidebar>
          </Col>

          <Col className="Home_Questions_Col" md={8}>
            <Row className="Home_Questions_Col_Tabs">
              <Col md={12}>
                <Row>
                  <Col md={6}>
                    <div className="Home_Questions_Col_Tabs_Text">
                      {questionPaper?.title}
                    </div>
                  </Col>
                  <Col md={4}></Col>
                  <Col md={2}>
                    <Button
                      onClick={() => history.push("/question/ask")}
                      className="Home_Questions_Col_Tabs_Button"
                    >
                      Ask Question
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <p>
                    <span>
                      Asked{" "}
                      {questionPaper?.createdAt
                        ? new Date(questionPaper.createdAt).toLocaleString()
                        : "5 days ago"}{" "}
                      &emsp;
                    </span>
                    <span>
                      {" "}
                      Modified{" "}
                      {questionPaper?.updateAt
                        ? new Date(questionPaper.updateAt).toLocaleString()
                        : "2 days ago"}{" "}
                      &emsp;{" "}
                    </span>
                    <span>
                      Viewed{" "}
                      {questionPaper?.viewCount ? questionPaper.viewCount : 0}{" "}
                      times
                    </span>
                  </p>
                </Row>
              </Col>
            </Row>
            <Row></Row>
            <Row className="question-details">
              <Col md={1}>
                <div className="all-options">
                  <p onClick={() => voteQuestion(1)} className="arrow">
                    ▲
                  </p>

                  <p className="arrow">{vote}</p>

                  <p onClick={() => voteQuestion(-1)} className="arrow">
                    ▼
                  </p>
                </div>
                <Bookmark />
              </Col>
              <Col md={11}>
                <div className="question-details-body">
                  {ReactHtmlParser(questionPaper?.body)}
                </div>
                {questionPaper?.tags?.map((tag) => {
                  return (
                    <>
                      <Button
                        style={{ margin: "20px" }}
                        className="question-tags"
                        onClick={() => {
                          history.push(`/questions/tagged/${tag}`);
                        }}
                      >
                        {tag}
                      </Button>
                    </>
                  );
                })}

                <Row></Row>
              </Col>
              <Row>
                <Col md={4}>
                  <AddComment
                    questionId={params.questionId}
                    comments={questionPaper?.comment}
                  />
                </Col>
                <Col md={4}>
                  <Container style={{ border: "1px solid" }}>
                    <Row>Asked by</Row>
                    <Row>
                      <Col md={2}>
                        {questionPaper?.ownerData?.picture ? (
                          <img
                            style={{ height: "2rem" }}
                            src={`${questionPaper?.ownerData?.picture}`}
                            alt="https://www.gravatar.com/avatar/250316629700dec8d54ad5e32c58863e?s=192&d=identicon&r=PG&f=1"
                          ></img>
                        ) : (
                          <img
                            style={{ height: "2rem" }}
                            src="https://www.gravatar.com/avatar/250316629700dec8d54ad5e32c58863e?s=192&d=identicon&r=PG&f=1"
                            alt="https://www.gravatar.com/avatar/250316629700dec8d54ad5e32c58863e?s=192&d=identicon&r=PG&f=1"
                          ></img>
                        )}
                      </Col>
                      <Col md={2}>
                        <Row
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            history.push("/profile", {
                              profileid: questionPaper?.ownerId,
                            })
                          }
                        >
                          {questionPaper?.ownerData?.full_name}
                        </Row>
                        <Row>{questionPaper?.ownerData?.reputation}</Row>
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>

              <b style={{ fontSize: "1.5rem" }}>
                {questionPaper?.answers ? questionPaper?.answers.length : 0}{" "}
                Answers
              </b>
            </Row>
            {questionPaper?.answers?.map((_q) => (
              <QuestionAnswer
                answer={_q}
                questionId={params.questionId}
                ownerId={questionPaper.ownerId}
                answerApprove={
                  questionPaper?.answerApproved
                    ? questionPaper.answerApproved
                    : false
                }
              />
            ))}

            <Row>
              <div style={{ fontSize: "1.5rem" }}>Your Answer</div>
              <AnswerQuestion questionId={params.questionId} />
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default QuestionOverview;
