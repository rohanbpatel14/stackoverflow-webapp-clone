import React from "react";
import { useHistory } from "react-router-dom";
import { Card, Button, Col, Row } from "react-bootstrap";
import "./css/TagCard.css";

function UserCard({ user, width }) {
  const history = useHistory();

  return (
    <Card className="Tag_Card" style={{ width: { width } }}>
      <Row>
        <Col xs={5}>
          <Row>
            <img
              style={{
                height: "40%",
                paddingTop: "12%",
                paddingLeft: "20%",
                paddingBottom: "12%",
              }}
              src={`https://secure.gravatar.com/avatar/${user.id}?s=164&d=identicon`}
              alt={user.full_name}
            />
          </Row>
        </Col>
        <Col xs={7}>
          <Card.Body>
            <Card.Title
              style={{ cursor: "pointer", color: "#0C6EFD", fontSize: "18px" }}
              onClick={() => {
                history.push("/profile", {
                  profileid: user.id,
                });
              }}
            >
              {user?.full_name}
            </Card.Title>
            <Card.Text style={{ paddingTop: "5%", fontSize: "16px" }}>
              {user.location ? user.loaction : "USA"}
            </Card.Text>
            <span
              style={{ fontSize: "16px", fontWeight: "bold", color: "#6A737C" }}
            >
              {user?.reputation}
            </span>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

export default UserCard;
