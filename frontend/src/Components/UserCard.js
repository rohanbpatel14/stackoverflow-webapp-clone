import React from "react";
import { useHistory } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import "./css/TagCard.css";

function UserCard({ user, width }) {
  const history = useHistory();

  return (
    <Card className="Tag_Card" style={{ width: { width } }}>
      <Card.Body>
        <Card.Title
          style={{ cursor: "pointer" }}
          onClick={() => {
            history.push("/profile", {
              profileid: user.profileid,
            });
          }}
        >
          {user?.full_name}
        </Card.Title>
        <Card.Text>{user?.Location}</Card.Text>
        <p>{user?.reputation}</p>
      </Card.Body>
    </Card>
  );
}

export default UserCard;
