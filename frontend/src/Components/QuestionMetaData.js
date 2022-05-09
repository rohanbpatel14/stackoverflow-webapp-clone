import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./css/QuestionMetaData.css";

function QuestionMetaData({ question }) {
  console.log(question);
  const location = {
    pathname: "/questionOverview",
    state: { abcd: question },
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
        <Col className="modifiedBy" md={2}>
          {question.answers.length} answers
        </Col>
        <Col md={7}>
          <Row>
            {question.tags &&
              question.tags.map((tag) => {
                return <Col md={2}>{tag}</Col>;
              })}
          </Row>
        </Col>
        <Col className="modifiedBy" md={3}>
          <div>{question?.QuestionModifiedBy}</div>
          modified
          <div>{question?.updatedAt && ((new Date()).getDate() - new Date(question.updatedAt).getDate())} day ago</div>
        </Col>
      </Row>
      <Row>
        <Col className="modifiedBy" md={2}>
          {question?.viewCount} views
        </Col>
      </Row>
      {/* </Row> */}
    </Col>
  );
}

export default QuestionMetaData;
