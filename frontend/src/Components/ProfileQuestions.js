import React from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import CheckIcon from "@mui/icons-material/Check";
import "./css/Profile.css";
import { useHistory } from "react-router-dom";

const ProfileQuestions = (props) => {
  const history = useHistory();
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

        <Row
          className="ProfileQuestionBody"
          onClick={() => {
            history.push(`/questionOverview/${props.question._id}`);
          }}
        >
          {props.question.body}
        </Row>
        <Row>
          {props.question.tags.map((tag) => (
            <Col xs={1} style={{ paddingRight: "10%", paddingTop: "2%" }}>
              <Button
                className="ProfileQuestionTags"
                size="sm"
                onClick={() => {
                  history.push(`/questions/tagged/${tag}`);
                }}
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
