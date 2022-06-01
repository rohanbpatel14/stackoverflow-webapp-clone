import React from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import CheckIcon from "@mui/icons-material/Check";
import "./css/Profile.css";
import { useHistory } from "react-router-dom";

const ProfileAnswers = (props) => {
  const history = useHistory();
  return (
    <>
      <Container>
        <Row className="ProfileQuestionRow">
          <div>
            {props.answer.__v} votes &nbsp;&nbsp;
            {props.answer.accepted && (
              <Button className="ProfileQuestionButton" size="12px">
                <CheckIcon fontSize="small" />
                Approved
              </Button>
            )}
            &nbsp;&nbsp;
          </div>
        </Row>

        <Row
          className="ProfileQuestionBody"
          onClick={() => {
            history.push(`/answerOverview/${props.answer._id}`);
          }}
        >
          {props.answer.body}
        </Row>
        <Row>
          {props.answer.tags.map((tag) => (
            <Col xs={1} style={{ paddingRight: "10%", paddingTop: "2%" }}>
              <Button
                className="ProfileQuestionTags"
                size="sm"
                onClick={() => {
                  history.push(`/answers/tagged/${tag}`);
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

export default ProfileAnswers;
