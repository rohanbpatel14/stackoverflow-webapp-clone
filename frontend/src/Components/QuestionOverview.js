import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Sidebar from './Sidebar'
import { useParams,useHistory } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'
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
      // question: "Hi"
      question: "<p>My code</p><p><br></p><p>  <span style='color: rgb(86, 156, 214);'>const</span> <span style='color: rgb(220, 220, 170);'>handleSubmit</span> = <span style='color: rgb(86, 156, 214);'>async</span> (<span style='color: rgb(156, 220, 254);'>e</span>) <span style='color: rgb(86, 156, 214);'>=></span> {</p><p>    <span style='color: rgb(156, 220, 254);'>e</span>.<span style='color: rgb(220, 220, 170);'>preventDefault</span>();</p><p>    <span style='color: rgb(156, 220, 254);'>console</span>.<span style='color: rgb(220, 220, 170);'>log</span>(<span style='color: rgb(79, 193, 255);'>body</span>);</p><p>    <span style='color: rgb(197, 134, 192);'>if</span> (<span style='color: rgb(79, 193, 255);'>title</span> !== <span style='color: rgb(206, 145, 120);'>''</span> && <span style='color: rgb(79, 193, 255);'>body</span> !== <span style='color: rgb(206, 145, 120);'>''</span>) {</p><p>      <span style='color: rgb(86, 156, 214);'>const</span> <span style='color: rgb(79, 193, 255);'>bodyJSON</span> = {</p><p>        <span style='color: rgb(156, 220, 254);'>title:</span> <span style='color: rgb(79, 193, 255);'>title</span>,</p><p>        <span style='color: rgb(156, 220, 254);'>body:</span> <span style='color: rgb(79, 193, 255);'>body</span>,</p><p>        <span style='color: rgb(156, 220, 254);'>tag:</span> <span style='color: rgb(156, 220, 254);'>JSON</span>.<span style='color: rgb(220, 220, 170);'>stringify</span>(<span style='color: rgb(79, 193, 255);'>tag</span>)</p><p>        <span style='color: rgb(106, 153, 85);'>// user: user,</span></p><p>      };</p><p>      <span style='color: rgb(197, 134, 192);'>await</span> <span style='color: rgb(79, 193, 255);'>axios</span></p><p>        .<span style='color: rgb(220, 220, 170);'>post</span>(<span style='color: rgb(206, 145, 120);'>'/api/question'</span>, <span style='color: rgb(79, 193, 255);'>bodyJSON</span>)</p><p>        .<span style='color: rgb(220, 220, 170);'>then</span>((<span style='color: rgb(156, 220, 254);'>res</span>) <span style='color: rgb(86, 156, 214);'>=></span> {</p><p>          <span style='color: rgb(106, 153, 85);'>// console.log(res.data);</span></p><p>          <span style='color: rgb(220, 220, 170);'>alert</span>(<span style='color: rgb(206, 145, 120);'>'Question added successfully'</span>);</p><p>          <span style='color: rgb(79, 193, 255);'>history</span>.<span style='color: rgb(220, 220, 170);'>push</span>(<span style='color: rgb(206, 145, 120);'>'/'</span>);</p><p>        })</p><p>        .<span style='color: rgb(220, 220, 170);'>catch</span>((<span style='color: rgb(156, 220, 254);'>err</span>) <span style='color: rgb(86, 156, 214);'>=></span> {</p><p>          <span style='color: rgb(156, 220, 254);'>console</span>.<span style='color: rgb(220, 220, 170);'>log</span>(<span style='color: rgb(156, 220, 254);'>err</span>);</p><p>        });</p><p>    }</p><p>  };</p>"
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
          <Row className="Home_Questions_Col_Tabs">
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
          <Row>
            <Col md={12}>
              <div>{ReactHtmlParser(questionPaper[0]?.question)}</div>
              {/* <div style={{display:"flex", justifyContent: "space-between"}}> */}
              {questionPaper[0]?.QuestionTags.map((tag)=>{
               return <>
                  
                      <Button style={{margin: "20px"}} className='question-tags'>{tag}</Button>

                </>
              })}
              {/* </div> */}
            </Col>
        </Row>
        </Col>
          
      </Row>
      
    </Container>
  )
}

export default QuestionOverview