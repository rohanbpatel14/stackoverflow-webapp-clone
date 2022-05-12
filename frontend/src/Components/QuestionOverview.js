import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Sidebar from './Sidebar'
import { useParams, useHistory } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'
import AnswerQuestion from './AnswerQuestion'
import { API } from "../../src/backend";
import './css/QuestionOverview.css'
import AddComment from './AddComment'
import Bookmark from './Bookmark'
import Navbar from './Navbar'
// import HistoryIcon from "@material-ui/icons/History";
function QuestionOverview({ match }) {
  const history = useHistory();
  const params = useParams();
  const [questionPaper, setQuestionPaper] = useState([]);
  const [bookmarkColor, setBookmarkColor] = useState("darkgray") 
  const getQuestionPaperDetails = (questionId) => {
    return fetch(`${API}/posts/${questionId}`, {
      method: "GET",
    })
      .then(response => {
        return response.json();
      })
      .then((res => {
        setQuestionPaper(res);
      }))
      .catch(err => console.log(err));
  }

  const [vote, setVote] = useState(0);

 

  useEffect(() => {
    getQuestionPaperDetails(params.questionId);
  }, [])
  return (
    <>
    <Navbar/>
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
                <p><span>Asked {questionPaper[0]?.createdAt ? new Date(questionPaper[0].createdAt).toLocaleString() : "5 days ago"} &emsp;</span>
                  <span> Modified {questionPaper[0]?.updateAt ? new Date(questionPaper[0].updateAt).toLocaleString() : "2 days ago"} &emsp; </span>
                  <span>Viewed {questionPaper[0]?.viewCount ? questionPaper[0].viewCount : 0} times</span></p>
              </Row>
            </Col>
          </Row>
          <Row>

          </Row>
          <Row className='question-details'>
            <Col md={1}>
              <div className="all-options">
                <p onClick={() => { setVote(vote + 1) }} className="arrow">▲</p>

                <p className="arrow">{vote}</p>

                <p onClick={() => { setVote(vote - 1) }} className="arrow">▼</p>
              </div>
              <Bookmark/>

            </Col>
            <Col md={11}>
              <div className='question-details-body'>{ReactHtmlParser(questionPaper[0]?.body)}</div>
              {questionPaper[0]?.tags.map((tag) => {
                return <>
                  <Button style={{ margin: "20px" }} className='question-tags'>{tag}</Button>
                </>
              })}
              <Row>
                <AddComment questionId={params.questionId} comments={questionPaper[0]?.comment} />
              </Row>
            </Col>
            <b style={{"fontSize": "1.5rem"}}>{questionPaper[0]?.answers ? questionPaper[0]?.answers.length : 0} Answers</b>
          </Row>

          <Row>
            
          </Row>
          {questionPaper[0]?.answers.map((_q) => (
            <>
              <Row className='question-details'>
                <Col md={1}>
                  <div className="all-questions-left">
                    <div className="all-options">
                      <p className="arrow">▲</p>

                      <p className="arrow">{_q.score}</p>

                      <p className="arrow">▼</p>
                    </div>
                    <Bookmark/>
                  </div>
                </Col>
                <Col>
                  <div className="question-answer">
                    <div className="question-answer-body">{ReactHtmlParser(_q.body)}</div>
                    <div className="author">
                      <small>
                        asked {new Date(_q.createdAt).toLocaleString()}
                      </small>
                      <div className="auth-details">
                        {/* <Avatar {...stringAvatar(_q?.user?.displayName)} /> */}
                        <p>
                          {_q?.user?.displayName
                            ? _q?.user?.displayName
                            : " "}
                        </p>
                      </div>
                    </div>
                  </div>
                  <AddComment questionId={params.questionId} comments={_q?.comment} />
                </Col>
              </Row>
            </>
          ))}
              <Row>
                <div style={{fontSize:'1.5rem'}}>Your Answer</div>
            <AnswerQuestion questionId={params.questionId} />
          </Row>
        </Col>
      </Row>

    </Container>
    </>
   
  )
}

export default QuestionOverview