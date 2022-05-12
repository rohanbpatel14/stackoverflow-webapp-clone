import React, { useEffect, useState } from "react";
import { API } from "../../src/backend";
import { Container, Row, Col, Button } from "react-bootstrap";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "./css/Tags.css";
import TagCard from "./TagCard";
import SearchIcon from "@mui/icons-material/Search";

function Tags() {
  const [tags, setTags] = useState([]);
  const [filterText, setFilterText] = useState("");
  const getAllTags = () => {
    return fetch(`${API}/tags`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        setTags(jsonResponse);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllTags();
  }, []);
  return (
    <>
    <Navbar/>
    <Container className="Home">
      <Row className="Home_Navbar"></Row>
      <Row className="Home_Sidebar">
        <Col className="Home_Sidebar_Col" md={2}>
          <Sidebar></Sidebar>
        </Col>
        <Col md={10}>
          <Row className="tags_header">
            <Col md={12}>
              <Row>
                <div className="Home_Questions_Col_Tabs_Text">Tags</div>
              </Row>
              <Row>
                <div className="tags_info">
                  A tag is a keyword or label that categorizes your question
                  with other, similar questions. Using the right tags makes it
                  easier for others to find and answer your question.
                </div>
              </Row>
              <Row className="tags_search_btn_group">
                <Col md={4}>
                  <div className="tags_search-middle">
                    <div className="tags_search_container">
                      <SearchIcon />
                      <input
                        onChange={(e) =>
                          (e.target.value.length >= 3 ||
                            e.target.value.length === 0) &&
                          setFilterText(e.target.value)
                        }
                        type="text"
                        placeholder="Filter by tag name..."
                      />
                    </div>
                  </div>
                </Col>
                <Col ms={6}></Col>
                <Col md={3}>
                  <div className="tags_button_group">
                    <Button
                      className="Home_Questions_Col_Tabs_Filter_Button"
                      variant="light"
                    >
                      Popular
                    </Button>
                    <Button
                      className="Home_Questions_Col_Tabs_Filter_Button"
                      variant="light"
                    >
                      Name
                    </Button>
                    <Button
                      className="Home_Questions_Col_Tabs_Filter_Button"
                      variant="light"
                    >
                      New
                    </Button>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            {tags &&
              tags
                .filter((tag) =>
                  tag?.tagname.toLowerCase().includes(filterText)
                )
                .map((tag, index) => {
                  return (
                    <div key={index} className="col-3 mb-3">
                      <TagCard tag={tag} />
                    </div>
                  );
                  // return <p>{tag?.tagname}</p>
                })}
          </Row>
        </Col>
      </Row>
    </Container>
    </>
   
  );
}

export default Tags;
