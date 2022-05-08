import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Sidebar from './Sidebar'
import { useParams, useHistory } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'
import AnswerQuestion from './AnswerQuestion'
import { API } from "../../src/backend";
import './css/QuestionOverview.css'
// import BookmarkIcon from "@material-ui/icons/Bookmark";
// import HistoryIcon from "@material-ui/icons/History";
function QuestionOverview({ match }) {
  const history = useHistory();
  const params = useParams();
  console.log(params);
  const [questionPaper, setQuestionPaper] = useState([]);

  const getQuestionPaperDetails = (questionId) => {
    return fetch(`${API}/posts/${questionId}`, {
      method: "GET",
    })
      .then(response => {
        return response.json();
      })
      .then((res=>{
        setQuestionPaper(res);
      }))
      .catch(err => console.log(err));
  }

  const [vote, setVote] = useState(0);

  useEffect(() => {
    getQuestionPaperDetails(params.questionId);
  }, [])
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
                    {questionPaper[0]?.title}
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
                <p><span>Asked {new Date(questionPaper[0]?.createdAt).getMonth()}/{new Date(questionPaper[0]?.createdAt).getDate()}/{new Date(questionPaper[0]?.createdAt).getFullYear()} &emsp;</span>
                  <span> Modified {new Date(questionPaper[0]?.updatedAt).getMonth()}/{new Date(questionPaper[0]?.updatedAt).getDate()}/{new Date(questionPaper[0]?.updatedAt).getFullYear()} &emsp; </span> 
                  <span>Viewed {questionPaper[0]?.viewCount} times</span></p>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md={1}>
                <div className="all-options">
                    <p onClick={()=>{setVote(vote+1)}} className="arrow">▲</p>

                    <p className="arrow">{  }</p>

                    <p onClick={()=>{setVote(vote-1)}} className="arrow">▼</p>
                  </div>
            </Col>
            <Col md={11}>
              <div>{ReactHtmlParser(questionPaper[0]?.body)}</div>
              {questionPaper[0]?.tags.map((tag) => {
                return <>

                  <Button style={{ margin: "20px" }} className='question-tags'>{tag}</Button>

                </>
              })}
            </Col>
            </Row>
            <Row>

            {questionPaper[0]?.answers.map((_q) => (
            <>
              <Col md={1}>
              <div className="all-questions-left">
                  <div className="all-options">
                    <p className="arrow">▲</p>

                    <p className="arrow">{_q.score}</p>

                    <p className="arrow">▼</p>

                    {/* <BookmarkIcon /> */}

                  </div>
                </div>
              </Col>
                <Col>
                <div className="question-answer">
                  {ReactHtmlParser(_q.body)}
                  <div className="author">
                    <small>
                      asked {new Date(_q.createdAt).toLocaleString()}
                    </small>
                    <div className="auth-details">
                      {/* <Avatar {...stringAvatar(_q?.user?.displayName)} /> */}
                      <p>
                        {_q?.user?.displayName
                          ? _q?.user?.displayName
                          : "Natalia lee"}
                      </p>
                    </div>
                  </div>
                </div>
                </Col>
               
            </>
          ))}
            </Row> 
           
           <Row>
            <AnswerQuestion questionId={params.questionId}/>             
           </Row>
         </Col>                     
      </Row>

    </Container>
  )
}

export default QuestionOverview