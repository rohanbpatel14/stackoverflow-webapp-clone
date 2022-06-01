import React from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import CheckIcon from "@mui/icons-material/Check";
import "./css/Profile.css";
import { useHistory } from "react-router-dom";

const ProfileReputation = (props) => {
  const history = useHistory();
  return (
    <>
      <Container>
        <Row>
          <Col className="ProfileQuestionRow" xs={3}>
            {props.reputation.event}
          </Col>
          <Col className="ProfileQuestionRow" style={{ color: "green" }} xs={1}>
            <strong>+{props.reputation.score} </strong>
          </Col>
          <Col className="ProfileQuestionBody" xs={8}>
            {props.reputation.body}
          </Col>
        </Row>
        <hr />
      </Container>
    </>
  );
};

export default ProfileReputation;
