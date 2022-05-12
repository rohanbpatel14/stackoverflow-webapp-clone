import { Tab, Tabs } from "@mui/material";
import React from "react";
import "./css/Message.css";

function Message() {
  return (
    // <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

    <div class="container">
      <div class="row clearfix">
        <div class="col-lg-12">
          <div class="card chat-app">
            <div id="plist" class="people-list">
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fa fa-search"></i>
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search..."
                />
              </div>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                //   value={value}
                //   onChange={handleChange}
                aria-label="Vertical tabs example"
                //   sx={{ width: 224 }}
                TabIndicatorProps={{
                  style: { background: "orange", textAlign: "right" },
                }}
              >
                <Tab
                  label=" "
                  sx={{ float: "right", textTransform: "none" }}
                ></Tab>
                <Tab label="Approvals" />
                <Tab label="Add Tags" />
              </Tabs>
            </div>
            <div class="chat">
              <div class="chat-header clearfix">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="chat-about">
                      <h6 class="m-b-0">Aiden Chavez</h6>
                      <small>Last seen: 2 hours ago</small>
                    </div>
                  </div>
                  <div class="col-lg-6 hidden-sm text-right"></div>
                </div>
              </div>
              <div class="chat-history">
                <ul class="m-b-0">
                  <li class="clearfix">
                    <div class="message-data text-right">
                      <span class="message-data-time">10:10 AM, Today</span>
                    </div>
                    <div class="message other-message float-right">
                      {" "}
                      Hi Aiden, how are you? How is the project coming along?{" "}
                    </div>
                  </li>
                  <li class="clearfix">
                    <div class="message-data">
                      <span class="message-data-time">10:12 AM, Today</span>
                    </div>
                    <div class="message my-message">Are we meeting today?</div>
                  </li>
                  <li class="clearfix">
                    <div class="message-data">
                      <span class="message-data-time">10:15 AM, Today</span>
                    </div>
                    <div class="message my-message">
                      Project has been already finished and I have results to
                      show you.
                    </div>
                  </li>
                </ul>
              </div>
              <div class="chat-message clearfix">
                <div class="input-group mb-0">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fa fa-send"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter text here..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
