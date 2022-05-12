import React,{useState} from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import AddComment from './AddComment'
import Bookmark from './Bookmark'
import ReactHtmlParser from 'react-html-parser'
import { API } from "../../src/backend";
import {isAutheticated} from '../auth/helper/authapicalls'
const {user}= isAutheticated();

function QuestionAnswer({answer,questionId}) {
    const [vote, setVote] = useState(answer.score);

    const voteQuestion = (val)=>{
        // return fetch(`${API}/posts/voteQuestion`, {
        //   method: "POST",
        //   headers: {
        //     Accept: "application/json",
        //     "Content-Type": "application/json"
        //   },
        //   body: JSON.stringify({userId: user.id, questionId: questionId, answerId: answer.id,value: val})
    
        // })
        //   .then(response => {
        //     return response.json();
        //   })
        //   .then((res => {
        //     setVote(vote + val);
        //   }))
        //   .catch(err => console.log(err));
        
      }
  return (
    <Container>
        <>
              <Row className='question-details'>
                <Col md={1}>
                  <div className="all-questions-left">
                    <div className="all-options">
                      <p className="arrow">▲</p>

                      <p onClick={()=>voteQuestion(1)} className="arrow">{answer.score}</p>

                      <p onClick={() =>voteQuestion(-1)} className="arrow">▼</p>
                    </div>
                    <Bookmark/>
                  </div>
                </Col>
                <Col>
                  <div className="question-answer">
                    <div className="question-answer-body">{ReactHtmlParser(answer.body)}</div>
                    <div className="author">
                      <small>
                        asked {new Date(answer.createdAt).toLocaleString()}
                      </small>
                      <div className="auth-details">
                        {/* <Avatar {...stringAvatar(_q?.user?.displayName)} /> */}
                        <p>
                          {answer?.user?.displayName
                            ? answer?.user?.displayName
                            : " "}
                        </p>
                      </div>
                    </div>
                  </div>
                  <AddComment questionId={questionId} comments={answer?.comment} />
                </Col>
              </Row>
            </>
    </Container>
  )
}

export default QuestionAnswer