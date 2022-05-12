import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./css/Home.css";
import QuestionMetaData from "./QuestionMetaData";
import { Link, useHistory } from "react-router-dom";
import { API } from "../../src/backend";

function Home() {
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
    return await fetch(`${API}/posts/getInteresting`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        setQuestions(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getQuestionMetaData();
  }, []);

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
                  <div className="Home_Questions_Col_Tabs_Text">
                    Top Questions
                  </div>
                </Col>
                <Col md={3}></Col>
                <Col md={3} style={{ textAlign: "right" }}>
                  <Button
                    onClick={() => history.push("/question/ask")}
                    className="Home_Questions_Col_Tabs_Button"
                  >
                    Ask Question
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col md={6}></Col>
                <Col md={6}>
                  <div className="Home_Questions_Col_Tabs_Filter">
                    <Button
                      onClick={() => filterQuestions("getInteresting")}
                      className="Home_Questions_Col_Tabs_Filter_Button"
                      variant="light"
                    >
                      Interesting
                    </Button>
                    <Button
                      onClick={(e) => filterQuestions("getHotPosts")}
                      className="Home_Questions_Col_Tabs_Filter_Button"
                      variant="light"
                    >
                      Hot
                    </Button>
                    <Button
                      onClick={(e) => filterQuestions("getTopScore")}
                      className="Home_Questions_Col_Tabs_Filter_Button"
                      variant="light"
                    >
                      Score
                    </Button>
                    <Button
                      onClick={(e) => filterQuestions("getTopUnanswered")}
                      className="Home_Questions_Col_Tabs_Filter_Button"
                      variant="light"
                    >
                      Unanswered
                    </Button>
                  </div>
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
            questions.map((question) => {
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

export default Home;
