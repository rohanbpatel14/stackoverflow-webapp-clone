import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

function Analytics() {
  const data = [
    {
      date: "5/11/2022",
      count: 4,
    },
    {
      date: "5/11/2022",
      count: 4,
    },
    {
      date: "5/11/2022",
      count: 4,
    },
    {
      date: "5/11/2022",
      count: 4,
    },
  ];
  return (
    <Container style={{ paddingLeft: "2%", width:"100%"}}>
      <Row style={{ paddingBottom: "2%" }}>
        <Col>
          <Card style={{ width: "100%" }}>
            <Card.Body>
              <Card.Title>Number of questions posted</Card.Title>

              <BarChart width={730} height={250} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#FFA500" />
              </BarChart>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row style={{ paddingBottom: "2%" }}>
        <Col style={{ width: "100%" }}>
          <Card >
            <Card.Body>
              <Card.Title>Top 10 most viewed questions.</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>

            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row style={{ paddingBottom: "2%" }}>
        <Col style={{ width: "100%" }}>
          <Card >
            <Card.Body>
              <Card.Title>Top 10 most used tags.</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>

            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row style={{ paddingBottom: "2%" }}>
        <Col style={{ width: "100%" }}>
          <Card >
            <Card.Body>
              <Card.Title>Top 10 users with highest reputation.</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>

            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row style={{ paddingBottom: "2%" }}>
        <Col style={{ width: "100%" }}>
          <Card >
            <Card.Body>
              <Card.Title>Top 10 users with lowest reputation.</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>

            </Card.Body>
          </Card>
        </Col>
      </Row>
      
    </Container>
  );
}

export default Analytics;
