import React, { useEffect,useState } from "react";
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
import { API } from "../../src/backend";
import TagCard from "./TagCard";
import UserCard from "./UserCard";
import QuestionMetaData from "./QuestionMetaData";
function Analytics() {
  const data = [
    {
      date: "5/11/2022",
      count: 4,
    },
    {
      date: "5/12/2022",
      count: 5,
    },
    {
      date: "5/13/2022",
      count: 10,
    },
    {
      date: "5/14/2022",
      count: 2,
    },
  ];
  const [mostViewedQuestions, setMostViewedQuestion] = useState([]);
  const [mostUsedTags, setMostUsedTags] = useState([]);
  const [highRepUsers, setHighRepUsers] = useState([]);
  const [lowRepUsers, setLowRepUsers] = useState([]);

  useEffect(()=>{
    const getMostViewedQuestions = ()=>{
      return fetch(`${API}/admin/mostviewed`, {
        method: "GET"
      })
        .then(response => {
          return response.json();
        })
        .then((res => {
          setMostViewedQuestion(res);
        }))
        .catch(err => console.log(err));
    }
    const getMostUsedQuestions = ()=>{
      return fetch(`${API}/admin/mostusedtags`, {
        method: "GET"
      })
        .then(response => {
          return response.json();
        })
        .then((res => {
          setMostUsedTags(res);
        }))
        .catch(err => console.log(err));
    }
    const getHighRepUsers = ()=>{
      return fetch(`${API}/admin/highrep`, {
        method: "GET"
      })
        .then(response => {
          return response.json();
        })
        .then((res => {
          setHighRepUsers(res);
        }))
        .catch(err => console.log(err));
    }
    const getLowRepUsers = ()=>{
      return fetch(`${API}/admin/lowrep`, {
        method: "GET"
      })
        .then(response => {
          return response.json();
        })
        .then((res => {
          setLowRepUsers(res);
        }))
        .catch(err => console.log(err));
    }
    getMostViewedQuestions();
    getMostUsedQuestions();
    getHighRepUsers();
    getLowRepUsers();
  },[])
  return (
    <Container style={{ paddingLeft: "2%", width:"100%"}}>
      <Row style={{ paddingBottom: "2%" }}>
        <Col>
          <Card style={{ width: "100%" }}>
            <Card.Body>
              <Card.Title style={{backgroundColor:"dodgerblue", color:"white", fontSize:"1.5rem"}}>Number of questions posted</Card.Title>

              <BarChart style={{marginTop:"2rem"}} width={730} height={250} data={data}>
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
              <Card.Title style={{backgroundColor:"dodgerblue", color:"white", fontSize:"1.5rem"}}>Top 10 most viewed questions.</Card.Title>
              <Card.Text style={{marginTop:"2rem"}}>
                <Container>
                  {mostViewedQuestions.map((question)=>{
                    return (
                      <Row style={{height: "15%"}} className="Home_Questions_Col_Questions">
                        <QuestionMetaData question={question} />
                      </Row>
                    );
                  })}
                </Container>
              </Card.Text>

            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row style={{ paddingBottom: "2%" }}>
        <Col style={{ width: "100%" }}>
          <Card >
            <Card.Body style={{backgroundColor:"aliceblue"}}>
              <Card.Title style={{backgroundColor:"dodgerblue", color:"white", fontSize:"1.5rem"}}>Top 10 most used tags.</Card.Title>
              <Card.Text style={{marginTop:"2rem"}}>
              <Container>
                  {mostUsedTags.map((tag)=>{
                    return (
                      <Row >
                        <TagCard tag={tag} width=""/>
                      </Row>
                    );
                  })}
                </Container>
              </Card.Text>

            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row style={{ paddingBottom: "2%" }}>
        <Col style={{ width: "100%" }}>
          <Card >
            <Card.Body style={{backgroundColor:"aliceblue"}}>
              <Card.Title style={{backgroundColor:"dodgerblue", color:"white", fontSize:"1.5rem"}}>Top 10 users with highest reputation.</Card.Title>
              <Card.Text style={{marginTop:"2rem"}}>
              <Container>
                  {highRepUsers.filter((user)=>user.user_type!==1).map((user)=>{
                    return (
                      <Row >
                        <UserCard user={user} width=""/>
                      </Row>
                    );
                  })}
                </Container>
              </Card.Text>

            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row style={{ paddingBottom: "2%" }}>
        <Col style={{ width: "100%" }}>
          <Card >
            <Card.Body style={{backgroundColor:"aliceblue"}}>
              <Card.Title style={{backgroundColor:"dodgerblue", color:"white", fontSize:"1.5rem"}}>Top 10 users with lowest reputation.</Card.Title>
              <Card.Text style={{marginTop:"2rem"}}>
              <Container>
                  {lowRepUsers.filter((user)=>user.user_type!==1).map((user)=>{
                    return (
                      <Row >
                        <UserCard user={user} width=""/>
                      </Row>
                    );
                  })}
                </Container>
              </Card.Text>

            </Card.Body>
          </Card>
        </Col>
      </Row>
      
    </Container>
  );
}

export default Analytics;
