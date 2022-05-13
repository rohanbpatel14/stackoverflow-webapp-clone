import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import Sidebar from "./Sidebar";
import "./css/Profile.css";
import EditIcon from "@mui/icons-material/Edit";
import CakeIcon from "@mui/icons-material/Cake";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ProfileMain from "./ProfileMain";
import ProfileActivity from "./ProfileActivity";
import ProfileEdit from "./ProfileEdit";
import Navbar from "./Navbar";
import axios from "axios";
import { API } from "../../src/backend";

const Profile = () => {
  const [flag, setFlag] = useState("profile");
  const { state } = useLocation();
  const profileid = state.profileid;
  const [userFlag, setUserFlag] = useState(false);
  const [lastSeen, setLastSeen] = useState("today");
  const [temp, setTemp] = useState(0);
  const [userLocation, setUserLocation] = useState("USA"); //change after location in added to database
  const [userData, setUserData] = useState({});
  const [badges, setBadges] = useState([]);

  const [userEditData, setData] = useState({
    Name: "",
    Location: "",
  });

  const getUserData = async () => {
    return await fetch(`${API}/user/profile/${profileid}`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        setUserData(res);
        // console.log(res);
        setTemp(calculateDaysBetweenDates(userData.last_seen, new Date()));
        if (temp === 0 || temp === NaN) {
          setLastSeen("today");
        } else {
          setLastSeen(temp + " days ago");
        }
      })
      .catch((err) => console.log(err));
  };

  const body = JSON.stringify({ user_id: 3 });

  const getBadges = async () => {
    return await fetch(`http://localhost:8080/api/badges/${profileid}`)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setBadges(result);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getUserData();
    getBadges();
    // console.log(profileid);
    if (localStorage.getItem("jwt")) {
      var current = JSON.parse(localStorage.getItem("jwt")).user.id;
      if (current === profileid) {
        setUserFlag(true);
      }
    }
    // if (state) {
    //   setData(state.state);
    // }
  }, []);

  function calculateDaysBetweenDates(date1, date2) {
    date1 = new Date(date1);
    var oneDay = 24 * 60 * 60 * 1000;
    var date1InMillis = date1.getTime();
    var date2InMillis = date2.getTime();
    var days = Math.round(Math.abs(date2InMillis - date1InMillis) / oneDay);
    return days;
  }

  return (
    <>
      <Navbar />
      <Container className="Home">
        <Row className="Home_Navbar"></Row>
        <Row className="Home_Sidebar">
          <Col className="Home_Sidebar_Col" md={2}>
            <Sidebar></Sidebar>
          </Col>
          {userData !== {} ? (
            <Col md={10}>
              <Row className="tags_header">
                <Col md={2}>
                  <div className="Profile_Image">
                    {/* {userData.picture === null ? (
                    <img
                      style={{ width: "80%", height: "80%" }}
                      src="https://www.oseyo.co.uk/wp-content/uploads/2020/05/empty-profile-picture-png-2-2.png"
                      alt={userData.email}
                    />
                  ) : (
                    <img
                      style={{ width: "80%", height: "80%" }}
                      src={userData.picture}
                      alt={userData.email}
                    />
                  )} */}
                    <img
                      style={{ width: "80%", height: "80%" }}
                      src={`https://secure.gravatar.com/avatar/${profileid}?s=164&d=identicon`}
                      alt={userData.email}
                    />
                  </div>
                </Col>

                <Col md={7}>
                  <br />
                  <br />
                  {userEditData.Name === "" ? (
                    <h2>{userData.full_name}</h2>
                  ) : (
                    <h2>{userEditData.Name}</h2>
                  )}

                  <div className="Profile_User_Info">
                    <CakeIcon fontSize="small" />
                    &nbsp;
                    {`Member since 
                    ${
                      calculateDaysBetweenDates(
                        userData.createdAt,
                        new Date()
                      ) + 1
                    }
                     days`}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <AccessTimeIcon fontSize="small" />
                    &nbsp;
                    {`Last Seen ${lastSeen}`}
                  </div>
                  {userEditData.Location === "" ? (
                    <div className="Profile_User_Info">
                      <LocationOnIcon fontSize="small" />
                      {userLocation}
                    </div>
                  ) : (
                    <div className="Profile_User_Info">
                      <LocationOnIcon fontSize="small" />
                      {userEditData.Location}
                    </div>
                  )}
                </Col>
                <Col md={2}>
                  <br />
                  {userFlag && (
                    <Button
                      variant="outline-dark"
                      size="md"
                      onClick={() => setFlag("settings")}
                    >
                      <EditIcon fontSize="small" /> Edit profile
                    </Button>
                  )}
                </Col>
              </Row>
              <br />
              <Row>
                <Col md={3}>
                  <Button
                    className={`Profile_Button_group ${
                      flag === "profile"
                        ? "Profile_Button_group_alt"
                        : "Profile_Button_group"
                    }`}
                    as="input"
                    type="button"
                    value="Profile"
                    onClick={() => setFlag("profile")}
                  />
                  {"  "}
                  <Button
                    className={`Profile_Button_group ${
                      flag === "activity"
                        ? "Profile_Button_group_alt"
                        : "Profile_Button_group"
                    }`}
                    as="input"
                    type="button"
                    value="Activity"
                    onClick={() => setFlag("activity")}
                  />
                  {"  "}
                  {userFlag && (
                    <Button
                      className={`Profile_Button_group ${
                        flag === "settings"
                          ? "Profile_Button_group_alt"
                          : "Profile_Button_group"
                      }`}
                      as="input"
                      type="button"
                      value="Settings"
                      onClick={() => setFlag("settings")}
                    />
                  )}
                </Col>
              </Row>
              <br />
              <Row>
                {flag === "profile" ? (
                  <ProfileMain user={userData} badges={badges} />
                ) : flag === "activity" ? (
                  <ProfileActivity user={userData} badges={badges} />
                ) : (
                  <ProfileEdit user={userData} />
                )}
              </Row>
            </Col>
          ) : (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
        </Row>
      </Container>
    </>
  );
};

export default Profile;
