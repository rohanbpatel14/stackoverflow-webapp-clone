import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Col, Container, Overlay, Popover, Row } from "react-bootstrap";
import "./css/Searchbar.css";

function Searchbar() {
  const [showPopover, setshowPopover] = useState(false);
  const [popoverTarget, setpopoverTarget] = useState("");
  const searchBarClickHandler = (e) => {
    setshowPopover(true);
    setpopoverTarget(e.target);
  };
  return (
    <>
      <SearchIcon />
      <input
        type="text"
        placeholder="Search..."
        onClick={searchBarClickHandler}
        onBlur={() => setshowPopover(false)}
      />

      <Overlay
        show={showPopover}
        target={popoverTarget}
        placement="bottom"
        container={this}
        containerPadding={20}
      >
        <Popover id="popover-contained" title="Popover bottom">
          <Container className="popover-container">
            <Row>
              <Col md={6}>
                <Row>[tag] search within a tag</Row>
                <Row>user:1234 search by author</Row>
                <Row>"words here" exact phrase</Row>
                <Row>collective:"Name" collective content</Row>
              </Col>
              <Col md={6}>
                <Row>answers:0 unanswered questions</Row>
                <Row>score:3 posts with a 3+ score</Row>
                <Row>is:question type of post</Row>
                <Row>isaccepted:yes search within status</Row>
              </Col>
            </Row>
          </Container>
        </Popover>
      </Overlay>
    </>
  );
}

export default Searchbar;
