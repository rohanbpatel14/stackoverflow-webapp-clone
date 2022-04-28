import React from 'react'
import NavBar from './Navbar'
import {Container,Row,Col,Button} from 'react-bootstrap'
import "./css/AskQuestion.css"
import QuestionEditor from './QuestionEditor'
function AskQuestion() {
  return (
    <Container className='AskQuestion'>
        <Row className='AskQuestion_Navbar'>
            <NavBar/>
        </Row>
        <Row className='AskQuestion_TopRow'>
            <Col md={4} className='AskQuestion_TopRow_Text'>
                Ask a public question
            </Col>
            <Col md={8}>
            </Col>
        </Row>
        <Row>
            <Container className='AskQuestion_Box'>
                <Row>
                    <Col md={12}>
                        <Row>
                        Title<br/>
                        Be specific and imagine you’re asking a question to another person
                        </Row>
                        <Row>
                            <input type="text"></input>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <QuestionEditor/>
                </Row>
                <Row>
                <Col md={12}>
                        <Row>
                        Tags <br/>
                        Add up to 5 tags to describe what your question is about
                        </Row>
                        <Row>
                            <input type="text"></input>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Row>
    </Container>
  )
}

export default AskQuestion