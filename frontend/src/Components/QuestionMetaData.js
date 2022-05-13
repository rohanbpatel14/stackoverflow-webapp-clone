import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { API } from "../../src/backend";
import { Link, useHistory } from "react-router-dom";
import "./css/QuestionMetaData.css";
import Users from "./Users";

function QuestionMetaData({ question, approval }) {
  console.log(question);
  const history = useHistory();
  const location = {
    pathname: "/questionOverview",
    state: { abcd: question },
  };

  const ApproveQuestion = () => {
    return fetch(`${API}/admin/approveque`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: question._id }),
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Col className="Home_Questions_Col_Question" md={12}>
      {/* <Row md={1}> */}
      <Row>
        <Col className="modifiedBy" md={2}>
          {question.post.score} votes
        </Col>
        <Col md={10}>
          <Link
            className="question_title"
            to={`/questionOverview/${question.post._id}`}
          >
            {question.post.title}
          </Link>
        </Col>
      </Row>
      <Row>
        <Col className="modifiedBy" md={2} style={{ padding: "1%" }}>
          {question?.post?.answers ? question?.post.answers.length : 0} answers
        </Col>
        <Col md={7}>
          <Row style={{ padding: "0%" }}>
            {question?.post?.tags &&
              question?.post?.tags.map((tag) => {
                return (
                  <Col style={{ margin: "5px" }} md={4}>
                    <Button
                      style={{
                        backgroundColor: "#E1ECF4",
                        color: "#39739D",
                        border: "none",
                        fontSize: "12px",
                      }}
                      onClick={() => {
                        history.push(`/questions/tagged/${tag}`);
                      }}
                    >
                      <strong>{tag}</strong>
                    </Button>
                  </Col>
                );
              })}
            <Col md={3}>
              <Row>
                <Col>
                  {question?.ownerData?.picture ? (
                    <img
                      style={{ height: "2rem" }}
                      src={`${question?.ownerData?.picture}`}
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
                <Col
                  style={{ cursor: "pointer", color:"blue" }}
                  onClick={() => {
                    history.push("/profile", {
                      profileid: question?.post?.ownerId,
                    });
                  }}
                >
                  {question?.ownerData?.full_name}
                </Col>
                <Col></Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col className="modifiedBy" md={3}>
          <div>{question?.post?.QuestionModifiedBy}</div>
          modified
          <div>
            {question?.post?.updatedAt &&
              new Date().getDate() -
                new Date(question?.post?.updatedAt).getDate()}{" "}
            day ago
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="modifiedBy" md={2}>
          {question?.post?.viewCount} views
        </Col>
      </Row>
      {approval && <Button onClick={ApproveQuestion}>Approve</Button>}
      {/* </Row> */}
    </Col>
  );
}

export default QuestionMetaData;
