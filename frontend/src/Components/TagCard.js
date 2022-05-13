import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import "./css/TagCard.css";
function TagCard({ tag, width }) {
  const history = useHistory();
  return (
    <Card className="Tag_Card" style={{ width: { width } }}>
      <Card.Body>
        <Button
          style={{
            backgroundColor: "#E1ECF4",
            color: "#39739D",
            border: "none",
            fontSize: "14px",
          }}
          onClick={() => {
            history.push(`/questions/tagged/${tag.tagname}`);
          }}
        >
          <strong>{tag?.tagname}</strong>
        </Button>
        <Card.Text style={{ paddingTop: "5%" }}>
          {tag?.description.slice(0, 150)} ...
        </Card.Text>
        <p>{tag?.questionCount} questions</p>
      </Card.Body>
    </Card>
  );
}

export default TagCard;
