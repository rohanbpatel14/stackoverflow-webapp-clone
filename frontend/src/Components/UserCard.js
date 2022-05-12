import React from "react";
import { Card, Button } from "react-bootstrap";
import "./css/TagCard.css";

function UserCard({ user, width }) {
  return (
    <Card className="Tag_Card" style={{ width: {width} }}>
      <Card.Body>
        <Card.Title>{user?.full_name}</Card.Title>
        <Card.Text>{user?.Location}</Card.Text>
        <p>{user?.reputation}</p>
      </Card.Body>
    </Card>
  );
}

export default UserCard;
