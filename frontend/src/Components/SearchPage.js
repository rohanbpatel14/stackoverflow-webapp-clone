import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./css/Home.css";
import QuestionMetaData from "./QuestionMetaData";
import { Link, useHistory, useLocation } from "react-router-dom";
import { API } from "../../src/backend";
import axios from "axios";

function SearchPage() {
  const location = useLocation();
  const payload = location.state.payload;

  const history = useHistory();
  const [currentFilter, setCurrentFilter] = useState("");
  const [questions, setQuestions] = useState([]);

  const filterQuestions = async (filterTag) => {
    return await fetch(`${API}/posts/${filterTag}`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        console.log(res);
        setQuestions(res);
      })
      .catch((err) => console.log(err));
  };

  const getQuestionMetaData = async () => {
    // return await fetch(`${API}/posts/getInteresting`, {
    //   method: "GET",
    // })
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((res) => {
    //     setQuestions(res);
    //   })
    //   .catch((err) => console.log(err));
    axios
      .post(`${API}/search`, payload)
      .then((res) => setQuestions(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getQuestionMetaData();
  }, [payload]);

  return (
    <>
      <Navbar />
      <Container className="Home">
        <Row className="Home_Sidebar">
          <Col className="Home_Sidebar_Col" md={2}>
            <Sidebar></Sidebar>
          </Col>
          <Col className="Home_Questions_Col" md={8}>
            <Row className="Home_Questions_Col_Tabs" md={2}>
              <Col md={12}>
                <Row>
                  <Col md={6}>
                    <Row>
                      <div className="Home_Questions_Col_Tabs_Text">
                        Search Results
                      </div>
                    </Row>
                  </Col>
                  <Col md={3}></Col>
                  <Col md={3} style={{ textAlign: "right" }}></Col>
                </Row>
                <Row>
                  <Col md={6}></Col>
                  <Col md={6}>
                    <div className="Home_Questions_Col_Tabs_Filter"></div>
                  </Col>
                </Row>
                <br />
              </Col>
            </Row>
            {
              /* {array
            .sort((a, b) => {
              if (currentFilter === "filterTagInteresting")
                return (
                  a.QuestionLastAskedOrModified - b.QuestionLastAskedOrModified
                );
              if (currentFilter === "filterTagHot")
                return b.QuestionViewsCount - a.QuestionViewsCount;
              if (
                currentFilter === "filterTagScore" ||
                currentFilter === "filterTagUnanswered"
              )
                return b.QuestionVoteCount - a.QuestionVoteCount;
            })
            .filter((question) =>
              currentFilter === "filterTagUnanswered" &&
              question.QuestionAnswerCount !== 0
                ? false
                : true
            ) }*/
              questions.slice(0, 10).map((question) => {
                return (
                  <Row className="Home_Questions_Col_Questions">
                    <QuestionMetaData question={question} />
                  </Row>
                );
              })
            }
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SearchPage;
