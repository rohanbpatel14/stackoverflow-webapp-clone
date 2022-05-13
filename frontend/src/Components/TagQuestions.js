import React, { useEffect,useState } from 'react'
import { useLocation, useParams,useHistory } from 'react-router-dom';
import { API } from "../../src/backend";
import Navbar from "./Navbar";
import { Container, Row, Col, Button } from "react-bootstrap";
import Sidebar from "./Sidebar";
// import "./css/Home.css";
import "./css/Home.css"
import QuestionMetaData from "./QuestionMetaData";
function TagQuestions() {
    const history = useHistory();
    const params = useParams();
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
    useEffect(()=>{
        const getTagQuestions = async (tag)=>{
            return await fetch(`${API}/posts/tag/${tag}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                  }
              })
                .then((response) => {
                  return response.json();
                })
                .then((res) => {
                  setQuestions(res.slice(0,100));
                })
                .catch((err) => console.log(err));
        }
        if(params.tag)
            getTagQuestions(params.tag);
    },[params.tag])
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
                    Questions tagged [{params.tag}]
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
          {questions.map((question) => {
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
  )
}

export default TagQuestions