import React,{useState} from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import {Container,Row,Col,Button} from 'react-bootstrap'
import "./css/Home.css"
import QuestionMetaData from './QuestionMetaData'
import { Link,useHistory } from "react-router-dom";

function Home() {
  const history = useHistory();
  const [filterTagInteresting, setFilterTagInteresting] = useState(false)
  const [filterTagHot, setFilterTagHot] = useState(false)
  const [filterTagScore, setFilterTagScore] = useState(false)
  const [filterTagUnanswered, setFilterTagUnanswered] = useState(false)
  const [filterMap, setFilterMap] = useState({
    All: () => true,
    Interesting: question => !question.completed,
    Completed: task => task.completed
  })
  let array = [{
    QuestionTitle: "How to slice a nested list twice?",
    QuestionVoteCount: 19,
    QuestionViewsCount: 33,
    QuestionAnswerCount: 3,
    QuestionLastAskedOrModified: "21",
    QuestionTags : ["python","list","nested-lists"],
    QuestionModifiedBy: " "
  },
  {
    QuestionTitle: "React image onClick not executing",
    QuestionVoteCount: 10,
    QuestionViewsCount: 30,
    QuestionAnswerCount: 0,
    QuestionLastAskedOrModified: "20",
    QuestionTags : ["python","list","nested-lists"],
    QuestionModifiedBy: " "
  },
  {
    QuestionTitle: "Update Notification Reminders",
    QuestionVoteCount: 14,
    QuestionViewsCount: 43,
    QuestionAnswerCount: 13,
    QuestionLastAskedOrModified: "18",
    QuestionTags : ["python","list","nested-lists"],
    QuestionModifiedBy: " "
  },
  {
    QuestionTitle: "How to slice a nested list twice?",
    QuestionVoteCount: 12,
    QuestionViewsCount: 20,
    QuestionAnswerCount: 0,
    QuestionLastAskedOrModified: "25",
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
                  <Button onClick={()=>history.push('/question/ask')} className='Home_Questions_Col_Tabs_Button'>Ask Question</Button>
                </Col>
              </Row>
              <Row>
                  <Col md={6}></Col>
                  <Col md={6}>
                    <div className='Home_Questions_Col_Tabs_Filter'>
                      <Button onClick={(e)=>setFilterTagInteresting(true)} className='Home_Questions_Col_Tabs_Filter_Button' variant="light">Interesting</Button>
                      <Button onClick={(e)=>setFilterTagHot(true)} className='Home_Questions_Col_Tabs_Filter_Button' variant="light">Hot</Button>
                      <Button onClick={(e)=>setFilterTagScore(true)} className='Home_Questions_Col_Tabs_Filter_Button' variant="light">Score</Button>
                      <Button onClick={(e)=>setFilterTagUnanswered(true)} className='Home_Questions_Col_Tabs_Filter_Button' variant="light">Unanswered</Button>
                    </div>
                  </Col>
              </Row>
            </Col>
            
          </Row >
          {array.sort((a,b)=>{
            if(filterTagInteresting)
                return a.QuestionLastAskedOrModified-b.QuestionLastAskedOrModified;
            if(filterTagHot)
              return b.QuestionViewsCount-a.QuestionViewsCount;
            if(filterTagScore || filterTagUnanswered)
              return b.QuestionVoteCount-a.QuestionVoteCount;
          }).filter((question)=>filterTagUnanswered ? question.QuestionAnswerCount===0 : question).map((question)=>{
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