import React from 'react'
import { Card ,Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./css/TagCard.css"
function TagCard({tag, width}) {
    return (
        <Card className="Tag_Card" style={{ width: {width} }}>
            <Card.Body>
                <Card.Title><Link to={{pathname:`/questions/tagged/${tag.tagname}`}}>{tag?.tagname}</Link></Card.Title>
                <Card.Text>
                    {tag?.description.slice(0,150)} ...
                </Card.Text>
                <p>{tag?.questionCount} questions</p>
            </Card.Body>
        </Card>
    )
}

export default TagCard