import React from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import CheckIcon from "@mui/icons-material/Check";
import "./css/Profile.css";
import { useHistory } from "react-router-dom";

const ProfileBookmarks = (props) => {
  const history = useHistory();
  return (
    <>
      <Container>
        <Row className="ProfileQuestionRow">
          <div>
            {props.bookmark.__v} votes &nbsp;&nbsp;
            {props.bookmark.bookmarks.length !== 0 && (
              <Button className="ProfileQuestionButton" size="12px">
                <CheckIcon fontSize="small" /> {props.bookmark.answers.length}{" "}
                answers
              </Button>
            )}{" "}
            &nbsp;&nbsp;
            {props.bookmark.bookmarks} bookmarks
          </div>
        </Row>

        <Row
          className="ProfileQuestionBody"
          onClick={() => {
            history.push(`/bookmarkOverview/${props.bookmark._id}`);
          }}
        >
          {props.bookmark.body}
        </Row>
        <Row>
          {props.bookmark.tags.map((tag) => (
            <Col xs={1} style={{ paddingRight: "10%", paddingTop: "2%" }}>
              <Button
                className="ProfileQuestionTags"
                size="sm"
                onClick={() => {
                  history.push(`/bookmarks/tagged/${tag}`);
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

export default ProfileBookmarks;
