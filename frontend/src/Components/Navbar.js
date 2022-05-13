import React, { useEffect, useState } from "react";
import { Button, Col, Container, Nav, Navbar } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import InboxIcon from "@mui/icons-material/Inbox";
import HelpIcon from "@mui/icons-material/Help";
import { Avatar } from "@mui/material";
import "./css/Navbar.css";
import Searchbar from "./Searchbar";
import { signout, isAutheticated } from "../auth/helper/authapicalls";
function NavBar({ history }) {
  const badges = { gold: 0, silver: 1, bronze: 0 }; // change after getting api call for badges
  // const history = useHistory();
  // const user = " ";
  const { user } = isAutheticated();
  var currentUserId = user && JSON.parse(localStorage.getItem("jwt")).user.id;
  const [reload, setReload] = useState(false);
  const handleLoginClick = () => history.push("/login");
  const handleSignupClick = () => history.push("/signup");

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: name ? stringToColor(name) : "rgba(255,255,255,0.8)",
      },
      children: name && `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }
  const Signout = () => {
    signout();
    document.location.reload();
  };

  useEffect(() => {}, []);

  return (
    <header>
      <div className="header-container">
        <div className="header-left">
          <Link to="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Stack_Overflow_logo.svg/220px-Stack_Overflow_logo.svg.png"
              alt="logo"
            />
          </Link>
          {/* <a href="/">
            
          </a> */}

          <h3>Products</h3>
        </div>
        <div className="header-middle">
          <div className="header-search-container">
            <Searchbar />
          </div>
        </div>
        <div className="header-right">
          <div className="header-right-container">
            {/* s */}
            <p>45</p>
            {/* <CircleIcon sx={{ color: "gold", width: "10px" }} /> */}
            <p>1</p>
            {/* {window.innerWidth < 768 && <SearchIcon />} */}
            {user && (
              <img
                style={{
                  height: "1.8rem",
                  width: "1.8rem",
                  cursor: "pointer",
                }}
                // {...stringAvatar(user && user.displayName)}
                onClick={() =>
                  history.push("/profile", {
                    profileid: currentUserId,
                  })
                }
                src={`https://secure.gravatar.com/avatar/${currentUserId}?s=164&d=identicon`}
                alt={"profile"}
                // {...stringAvatar(user)}
              />
            )}
            &nbsp;&nbsp;
            {user && <InboxIcon />}
            {user && <HelpIcon />}
            &nbsp;
            {user && (
              <svg
                aria-hidden="true"
                class="svg-icon iconStackExchange"
                width="24"
                height="24"
                viewBox="0 0 18 18"
                fill="rgba(0,0,0,0.5)"
                style={{
                  cursor: "pointer",
                }}
                onClick={() => history.push("/message")}
              >
                <path d="M15 1H3a2 2 0 00-2 2v2h16V3a2 2 0 00-2-2ZM1 13c0 1.1.9 2 2 2h8v3l3-3h1a2 2 0 002-2v-2H1v2Zm16-7H1v4h16V6Z"></path>
              </svg>
            )}
            {isAutheticated() && (
              <Button
                variant="light"
                onClick={() => {
                  signout(() => {
                    history.push("/");
                  });
                }}
              >
                Signout
              </Button>
            )}
            {!isAutheticated() && (
              <div>
                <Button onClick={() => history.push("/login")}>Log in</Button>
                &nbsp;
                <Button onClick={() => history.push("/signup")}>Sign up</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default withRouter(NavBar);
