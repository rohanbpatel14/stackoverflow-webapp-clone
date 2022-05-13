import React from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import CheckIcon from "@mui/icons-material/Check";
import "./css/Profile.css";

const ProfileQuestions = (props) => {
  return (
    <>
      <Container>
        <Row className="ProfileQuestionRow">
          <div>
            {props.question.__v} votes &nbsp;&nbsp;
            {props.question.answers.length !== 0 && (
              <Button className="ProfileQuestionButton" size="12px">
                <CheckIcon fontSize="small" /> {props.question.answers.length}{" "}
                answers
              </Button>
            )}
            &nbsp;&nbsp;
            {props.question.viewCount} views
          </div>
        </Row>
        <Row className="ProfileQuestionBody" onClick={() => {}}>
          {props.question.body}
        </Row>
        <Row>
          {props.question.tags.map((tag) => (
            <Col xs={1} style={{ paddingRight: "10%", paddingTop: "2%" }}>
              <Button
                className="ProfileQuestionTags"
                size="sm"
                onClick={() => {}}
              >
                {tag}
              </Button>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default ProfileQuestions;
