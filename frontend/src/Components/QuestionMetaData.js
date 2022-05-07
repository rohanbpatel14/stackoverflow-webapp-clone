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
          {question.QuestionVoteCount} votes
        </Col>
        <Col md={10}>
          <Link
            className="question_title"
            to={`/questionOverview/${question._id}`}
          >
            {question.QuestionTitle}
          </Link>
        </Col>
      </Row>
      <Row>
        <Col className="modifiedBy" md={2}>
          {question.QuestionAnswerCount} answers
        </Col>
        <Col md={7}>
          <Row>
            {question.QuestionTags &&
              question.QuestionTags.map((tag) => {
                return <Col md={2}>{tag}</Col>;
              })}
          </Row>
        </Col>
        <Col className="modifiedBy" md={3}>
          <div>{question?.QuestionModifiedBy}</div>
          modified
          <div>{question?.QuestionLastAskedOrModified} mins ago</div>
        </Col>
      </Row>
      <Row>
        <Col className="modifiedBy" md={2}>
          {question?.QuestionViewsCount} views
        </Col>
      </Row>
      {/* </Row> */}
    </Col>
  );
}

export default QuestionMetaData;
