import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Sidebar from './Sidebar'
import { useParams,useHistory } from 'react-router-dom'

function QuestionOverview({match}) {
  const history = useHistory();
  const params = useParams();
  console.log(params);
  const [questionPaper, setQuestionPaper] = useState([]);
  const getQuestionPaperDetails = (questionId)=>{
    setQuestionPaper([{
      _id: 1,
      QuestionTitle: "How to slice a nested list twice?",
      Question: "",
      QuestionVoteCount: 19,
      QuestionViewsCount: 33,
      QuestionAnswerCount: 3,
      QuestionLastAskedOrModified: "21",
      QuestionTags: ["python", "list", "nested-lists"],
      QuestionModifiedBy: " ",
    }]);
  }

  useEffect(()=>{
    getQuestionPaperDetails(params.questionId);
  },[])
  return (
    <Container className='Home'>
      <Row className='Home_Sidebar'>
        <Col className='Home_Sidebar_Col' md={2}>
          <Sidebar></Sidebar>
        </Col>

          <Col className="Home_Questions_Col" md={8}>
          <Row className="Home_Questions_Col_Tabs" md={2}>
            <Col md={12}>
              <Row>
                <Col md={6}>
                  <div className="Home_Questions_Col_Tabs_Text">
                    {questionPaper[0]?.QuestionTitle}
                  </div>
                </Col>
                <Col md={4}></Col>
                <Col md={2}>
                  <Button
                    onClick={() => history.push("/question/ask")}
                    className="Home_Questions_Col_Tabs_Button"
                  >
                    Ask Question
                  </Button>
                </Col>
              </Row>
              <Row>
                <p>Asked today
Modified today
Viewed 27 times</p>
              </Row>
            </Col>
          </Row>
        </Col>
          
      </Row>
    </Container>
  )
}

export default QuestionOverview