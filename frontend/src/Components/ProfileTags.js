import React from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import CheckIcon from "@mui/icons-material/Check";
import "./css/Profile.css";
import { useHistory } from "react-router-dom";

const ProfileTags = (props) => {
  const history = useHistory();
  return (
    <>
      <Container>
        <Row>
          <Col xs={8} style={{ paddingRight: "10%", paddingTop: "2%" }}>
            <Button className="ProfileQuestionTags" size="sm">
              {props.tag.name}
            </Button>
          </Col>
          <Col className="ProfileQuestionRow" xs={2}>
            <strong>{props.tag.score} </strong>score
          </Col>
          <Col className="ProfileQuestionRow" xs={2}>
            <strong>{props.tag.posts}</strong> posts
          </Col>
        </Row>
        <hr />
      </Container>
    </>
  );
};

export default ProfileTags;
