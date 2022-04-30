import React from 'react'
import { Card ,Button} from 'react-bootstrap';
import "./css/TagCard.css"
function TagCard({tag}) {
    return (
        <Card className="Tag_Card" style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{tag?.tagname}</Card.Title>
                <Card.Text>
                    {tag?.description.slice(0,150)} ...
                </Card.Text>
                <p>{tag?.questionCount} questions</p>
            </Card.Body>
        </Card>
    )
}

export default TagCard