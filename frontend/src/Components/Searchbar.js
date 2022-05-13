import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Col, Container, Overlay, Popover, Row } from "react-bootstrap";
import "./css/Searchbar.css";
import axios from "axios";
import { API } from "../backend";

function Searchbar() {
  const [showPopover, setshowPopover] = useState(false);
  const [popoverTarget, setpopoverTarget] = useState("");

  const [searchString, setSearchString] = useState("");

  const searchBarClickHandler = (e) => {
    setshowPopover(true);
    setpopoverTarget(e.target);
  };
  const searchBarChangeHandler = (e) => {
    setSearchString(e.target.value);
  };
  const searchButtonClickHandler = () => {
    var tags = searchString.match(/\[(.*?)\]/);
    let key = searchString;
    if (tags) {
      var tag = tags[1];
      key = key.replace(/(\[.+\])/g, "").trim();
      console.log(key);
    }
    var words = key.trim().split(/\s+/);

    if (words[0].startsWith("user:")) {
      var user = words[0].replace("user:", "");
      key = words.slice(1).join(" ");
    } else if (words[0].startsWith("isaccepted:yes")) {
      var isAccepted = true;
      key = words.slice(1).join(" ");
    }

    const payload = {
      key: key,
      tag: tag,
      isAccepted: isAccepted,
      user: user,
    };
    console.log("payload", payload);
    axios.post(`${API}/search`, payload).then((res) => console.log(res));
  };
  return (
    <>
      <SearchIcon onClick={searchButtonClickHandler} />
      <input
        type="text"
        placeholder="Search..."
        onClick={searchBarClickHandler}
        onBlur={() => setshowPopover(false)}
        onChange={searchBarChangeHandler}
        value={searchString}
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
            <Row style={{ padding: 3 }}>
              <Col md={6}>
                <Row style={{ padding: 3 }}>[tag] search within a tag</Row>
                <Row style={{ padding: 3 }}>user:1234 search by author</Row>
                <Row style={{ padding: 3 }}>"words here" exact phrase</Row>
              </Col>
              <Col md={6}>
                <Row style={{ padding: 3 }}>is:question type of post</Row>
                <Row style={{ padding: 3 }}>
                  isaccepted:yes search within status
                </Row>
              </Col>
            </Row>
          </Container>
        </Popover>
      </Overlay>
    </>
  );
}

export default Searchbar;
