import React from 'react'
import {Container,Row,Col,Button} from 'react-bootstrap'

function QuestionMetaData({question}) {
  return (
    <Col className='Home_Questions_Col_Question' md={12}>
        <Row>
            <Col md={1}>
                 {question.QuestionVoteCount} vote
            </Col>
            <Col md={11}>
                {question.QuestionTitle}
            </Col>
        </Row>
        <Row>
            <Col md={1}>
                 {question.QuestionAnswerCount} 
            </Col>
            <Col md={8}>
                <Row>
                    {question.QuestionTags && question.QuestionTags.map((tag)=>{
                        return <Col md={2}>
                            {tag}
                        </Col>
                    })}
                </Row>
            </Col>
            <Col className='modifiedBy' md={3}>
                <div>
                {question?.QuestionModifiedBy}  
                </div>
                <div>
                {question?.QuestionLastAskedOrModified}
                </div>
            </Col>
        </Row>
        <Row>
        {question?.QuestionViewsCount}  
        </Row>
    </Col>
  )
}

export default QuestionMetaData