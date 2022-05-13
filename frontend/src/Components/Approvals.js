import React, { useEffect,useState } from 'react'
import { Container,Row,Col, Button } from 'react-bootstrap';
import { API } from "../../src/backend";
import QuestionMetaData from "./QuestionMetaData";
import "./css/Home.css";
function Approvals() {
    const [questions, setQuestions] = useState([]);
   
useEffect(()=>{

    const getUnApprovedQuestions = ()=>{
        return fetch(`${API}/admin/getuaqs`, {
            method: "GET"
          })
            .then(response => {
              return response.json();
            })
            .then((res => {
                console.log(res);
                setQuestions(res);
            //   setMostViewedQuestion(res);
            }))
            .catch(err => console.log(err));
    }
    getUnApprovedQuestions();
},[])
  return (
   <Container>
       {questions.map((question) => {
              return (
                <Row className="Home_Questions_Col_Questions">
                    <QuestionMetaData question={question} approval={true}/>
                    {/* <Button onClick={ApproveQuestion}>Approve</Button> */}
                </Row>
              );
            })}
   </Container>
  )
}

export default Approvals