import React from 'react'
import { Card ,Button} from 'react-bootstrap';
import "./css/TagCard.css"

function UserCard({user}) {
  return (
    <Card className="Tag_Card" style={{ width: '18rem' }}>
    <Card.Body>
        <Card.Title>{user?.Username}</Card.Title>
        <Card.Text>
            {user?.Location}
        </Card.Text>
        <p>{user?.Reputation}</p>
    </Card.Body>
</Card>
  )
}

export default UserCard