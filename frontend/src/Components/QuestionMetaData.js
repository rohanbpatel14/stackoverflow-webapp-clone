import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { API } from "../../src/backend";
import { Link, useHistory } from "react-router-dom";
import "./css/QuestionMetaData.css";

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
          {question.score} votes
        </Col>
        <Col md={10}>
          <Link
            className="question_title"
            to={`/questionOverview/${question._id}`}
          >
            {question.title}
          </Link>
        </Col>
      </Row>
      <Row>
        <Col className="modifiedBy" md={2} style={{ padding: "1%" }}>
          {question.answers.length} answers
        </Col>
        <Col md={7}>
          <Row style={{ padding: "0%" }}>
            {question.tags &&
              question.tags.map((tag) => {
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
          </Row>
        </Col>
        <Col className="modifiedBy" md={3}>
          <div>{question?.QuestionModifiedBy}</div>
          modified
          <div>
            {question?.updatedAt &&
              new Date().getDate() -
                new Date(question.updatedAt).getDate()}{" "}
            day ago
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="modifiedBy" md={2}>
          {question?.viewCount} views
        </Col>
      </Row>
      {approval && <Button onClick={ApproveQuestion}>Approve</Button>}
      {/* </Row> */}
    </Col>
  );
}

export default QuestionMetaData;
