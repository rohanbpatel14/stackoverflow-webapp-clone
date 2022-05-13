import React, { useEffect, useState } from "react";
import "./css/Sidebar.css";
import { Link, useHistory, useLocation } from "react-router-dom";

function Sidebar() {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    // console.log("TESSSSTTTT: " + JSON.stringify(location));
  }, []);

  return (
    <div className="sidebar-container">
      <div className="sidebar-tabs">
        <div
          className="sidebar-tabs-maintitle"
          style={
            location.pathname === "/"
              ? {
                  background:
                    "linear-gradient(90deg, #f1f2f3 98%, #f48224 98%)",
                  fontWeight: "bold",
                }
              : {}
          }
          onClick={() => history.push("/")}
        >
          Home
        </div>
        <div>
          <div className="sidebar-tabs-maintitle">PUBLIC</div>
          <div className="sidebar-tabs-public">
            <div
              className="sidebar-tabs-subtitle"
              style={
                location.pathname === "/tags"
                  ? {
                      background:
                        "linear-gradient(90deg, #f1f2f3 98%, #f48224 98%)",
                      fontWeight: "bold",
                    }
                  : {}
              }
              onClick={() => history.push("/tags")}
            >
              Tags
            </div>
            <div
              className="sidebar-tabs-subtitle"
              style={
                location.pathname === "/users" ||
                location.pathname === "/profile"
                  ? {
                      background:
                        "linear-gradient(90deg, #f1f2f3 98%, #f48224 98%)",
                      fontWeight: "bold",
                    }
                  : {}
              }
              onClick={() => history.push("/users")}
            >
              Users
            </div>
            <div
              className="sidebar-tabs-subtitle"
              style={
                location.pathname === "/companies"
                  ? {
                      background:
                        "linear-gradient(90deg, #f1f2f3 98%, #f48224 98%)",
                      fontWeight: "bold",
                    }
                  : {}
              }
              // onClick={() => history.push("/companies")}
            >
              Companies
            </div>
          </div>
        </div>

        <div className="sidebar-tabs-maintitle">COLLECTIVES</div>
        <div className="sidebar-tabs-maintitle">TEAMS</div>
      </div>
    </div>
  );
}

export default Sidebar;
