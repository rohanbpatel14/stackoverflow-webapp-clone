import React from "react";
import NavBar from "./Navbar";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./css/AskQuestion.css";
import QuestionEditor from "./QuestionEditor";
function AskQuestion() {
  return (
    // <Container className="AskQuestion">
    //   <Row className="AskQuestion_TopRow">
    //     <Col md={4} className="AskQuestion_TopRow_Text">
    //       Ask a public question
    //     </Col>
    //     <Col md={8}></Col>
    //   </Row>
    //   <Row>
    //     <Container className="AskQuestion_Box">
    //       <Row>
    //         <Col md={12}>
    //           <Row>
    //             Title
    //             <br />
    //             Be specific and imagine you’re asking a question to another
    //             person
    //           </Row>
    //           <Row>
    //             <input type="text"></input>
    //           </Row>
    //         </Col>
    //       </Row>
    //       <Row>
    //         <QuestionEditor />
    //       </Row>
    //       <Row>
    //         <Col md={12}>
    //           <Row>
    //             Tags <br />
    //             Add up to 5 tags to describe what your question is about
    //           </Row>
    //           <Row>
    //             <input type="text"></input>
    //           </Row>
    //         </Col>
    //       </Row>
    //     </Container>
    //   </Row>
    // </Container>
    <div className="add-question">
      <div className="add-question-container">
        <div className="head-title">
          <h1>Ask a public question</h1>
        </div>
        <div className="question-container">
          <div className="question-options">
            <div className="question-option">
              <div className="title">
                <h3>Title</h3>
                <small>
                  Be specific and imagine you’re asking a question to another
                  person
                </small>
                <input
                  //   value={title}
                  //   onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="e.g Is there an R function for finding teh index of an element in a vector?"
                />
              </div>
            </div>
            <div className="question-option">
              <div className="title">
                <h3>Body</h3>
                <small>
                  Include all the information someone would need to answer your
                  question
                </small>
                <QuestionEditor />
              </div>
            </div>
            <div className="question-option">
              <div className="title">
                <h3>Tags</h3>
                <small>
                  Add up to 5 tags to describe what your question is about
                </small>
                <input type="text"></input>
              </div>
            </div>
          </div>
        </div>

        <Button
          // onClick={handleSubmit}
          className="button"
        >
          Add your question
        </Button>
      </div>
    </div>
  );
}

export default AskQuestion;
