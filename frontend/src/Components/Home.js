import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import {Container,Row,Col,Button} from 'react-bootstrap'
import "./css/Home.css"
import QuestionMetaData from './QuestionMetaData'
function Home() {

  let array = [{
    QuestionTitle: "How to slice a nested list twice?",
    QuestionVoteCount: 1,
    QuestionViewsCount: 33,
    QuestionAnswerCount: 3,
    QuestionLastAskedOrModified: "21 mins ago",
    QuestionTags : ["python","list","nested-lists"],
    QuestionModifiedBy: " "
  },
  {
    QuestionTitle: "How to slice a nested list twice?",
    QuestionVoteCount: 1,
    QuestionViewsCount: 33,
    QuestionAnswerCount: 3,
    QuestionLastAskedOrModified: "21 mins ago",
    QuestionTags : ["python","list","nested-lists"],
    QuestionModifiedBy: " "
  },
  {
    QuestionTitle: "How to slice a nested list twice?",
    QuestionVoteCount: 1,
    QuestionViewsCount: 33,
    QuestionAnswerCount: 3,
    QuestionLastAskedOrModified: "21 mins ago",
    QuestionTags : ["python","list","nested-lists"],
    QuestionModifiedBy: " "
  },
  {
    QuestionTitle: "How to slice a nested list twice?",
    QuestionVoteCount: 1,
    QuestionViewsCount: 33,
    QuestionAnswerCount: 3,
    QuestionLastAskedOrModified: "21 mins ago",
    QuestionTags : ["python","list","nested-lists"],
    QuestionModifiedBy: " "
  }]
  return (
    <Container className='Home'>
      <Row className='Home_Navbar'>
        <Navbar></Navbar>
      </Row>
      <Row className='Home_Sidebar'>
        <Col className='Home_Sidebar_Col' md={2}>
          <Sidebar></Sidebar>
        </Col>
        <Col className='Home_Questions_Col' md={8}>
          <Row  className='Home_Questions_Col_Tabs' md={2}>
            <Col md={12}>
              <Row>
                  <Col md={6}>
                  <div className='Home_Questions_Col_Tabs_Text'>Top Questions</div>
                </Col>
                <Col md={4}></Col>
                <Col md={2}>
                  <Button className='Home_Questions_Col_Tabs_Button'>Ask Question</Button>
                </Col>
              </Row>
              <Row>
                  <Col md={6}></Col>
                  <Col md={6}>
                    <div className='Home_Questions_Col_Tabs_Filter'>
                      <Button className='Home_Questions_Col_Tabs_Filter_Button' variant="light">Ask Question</Button>
                      <Button className='Home_Questions_Col_Tabs_Filter_Button' variant="light">Ask Question</Button>
                      <Button className='Home_Questions_Col_Tabs_Filter_Button' variant="light">Ask Question</Button>
                      <Button className='Home_Questions_Col_Tabs_Filter_Button' variant="light">Ask Question</Button>
                    </div>
                  </Col>
              </Row>
            </Col>
            
          </Row >
          {array.map((question)=>{
             return <Row className='Home_Questions_Col_Questions'>
                <QuestionMetaData question={question}/>
              </Row>
          })}
        </Col>
      </Row>
    </Container>
  )
}

export default Home