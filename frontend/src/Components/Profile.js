import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Sidebar from "./Sidebar";
import "./css/Profile.css";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
import EditIcon from "@mui/icons-material/Edit";
import CakeIcon from "@mui/icons-material/Cake";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ProfileMain from "./ProfileMain";
import ProfileActivity from "./ProfileActivity";
import ProfileEdit from "./ProfileEdit";

const Profile = () => {
  const [flag, setFlag] = useState("profile");
  const user = {
    id: 2, // int
    Name: " ", // varchar
    Email: "siddhant@gmail.com", // varchar
    Password: "", // varcher
    UserType: 1, // int
    Picture: "", // varchar
    CreatedAt: "2022-05-08", // date
    LastSeen: "2022-05-08", // date
    Location: "USA", // varcher
    Reputation: 100, // int
    QuestionCount: 5, // int
    AnswerCount: 2, // int
    Reach: 2, // int
    About: "Lorem Ipsum", // varchar
  };
  return (
    <Container className="Home">
      <Row className="Home_Navbar"></Row>
      <Row className="Home_Sidebar">
        <Col className="Home_Sidebar_Col" md={2}>
          <Sidebar></Sidebar>
        </Col>
        <Col md={10}>
          <Row className="tags_header">
            <Col md={2}>
              <div className="Profile_Image">
                <a>
                  <img
                    src={`https://secure.gravatar.com/avatar/${user.id}?s=164&d=identicon`}
                    alt={user.Email}
                  />
                </a>
              </div>
            </Col>
            <Col md={7}>
              <br />
              <br />
              <h2> </h2>
              <div className="Profile_User_Info">
                <CakeIcon fontSize="small" /> Member for 2 days{" "}
                <AccessTimeIcon fontSize="small" /> Last seen this week{" "}
                <CalendarMonthIcon fontSize="small" /> Visited 2 days, 2
                consecutive
              </div>
              <div class="Profile_User_Info">
                <LocationOnIcon fontSize="small" />
                USA
              </div>
            </Col>
            <Col md={2}>
              <br />
              <Button
                variant="outline-dark"
                size="md"
                onClick={() => setFlag("settings")}
              >
                <EditIcon fontSize="small" /> Edit profile
              </Button>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={3}>
              <Button
                className="Profile_Button_group"
                as="input"
                type="button"
                value="Profile"
                onClick={() => setFlag("profile")}
              />{" "}
              <Button
                className="Profile_Button_group"
                as="input"
                type="button"
                value="Activity"
                onClick={() => setFlag("activity")}
              />
              <Button
                className="Profile_Button_group"
                as="input"
                type="button"
                value="Settings"
                onClick={() => setFlag("settings")}
              />
            </Col>
          </Row>
          <br />
          <Row>
            {flag === "profile" ? (
              <ProfileMain user={user} />
            ) : flag === "activity" ? (
              <ProfileActivity />
            ) : (
              <ProfileEdit />
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
