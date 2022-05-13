import React, { useEffect, useState } from "react";
import "./css/Message.css";
import { isAutheticated } from "../auth/helper/authapicalls";
import axios from "axios";
import { API } from "../backend";
import Navbar from "./Navbar";
import Select from "react-select";
import { useDebounce } from 'use-debounce';

const { user } = isAutheticated();

function Message() {
  const [activeChat, setActiveChat] = useState("");
  const [message, setMessage] = useState("");
  const [chatUsers, setChatUsers] = useState(new Map());
  const [chatData, setChatData] = useState([]);
  const [send, setsend] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchList, setSearchList] = useState([])

  useEffect(() => {
    axios
      .get(`${API}/chat/get/${user.id} `)
      .then((res) => {
        console.log(res.data);
        setChatData(res.data);
        setChatUsers(uniqueConnections(res.data));
      })
      .catch((err) => {
        // alert(err?.response?.data);
        console.log(err);
      });
  }, [send]);

  const uniqueConnections = (res) => {
    const chatUsers = new Map();
    res.forEach((msg) => {
      let sender_id = msg.sender_id;
      let sender = msg.sender;
      let reciever_id = msg.reciever_id;
      let reciever = msg.reciever;
      if (!chatUsers.has(sender_id)) {
        chatUsers.set(sender_id, sender);
      }
      if (!chatUsers.has(reciever_id)) {
        chatUsers.set(reciever_id, reciever);
      }
    });
    return chatUsers;
  };

  const handleSendMessage = () => {
    const payload = {
      sender_id: user.id,
      reciever_id: activeChat,
      message: message,
    };
    axios
      .post(`${API}/chat/send`, payload)
      .then((res) => {
        console.log(res.data);
        setsend(!send);
        setMessage("");
      })
      .catch((err) => {
        // alert(err?.response?.data);
        console.log(err);
      });
  };

  const handleChange = (data) => {
    console.log(data);
    chatUsers.set(data.value, data.label)
    setActiveChat(data.value)
  }

  const handleSearchChange = (input) => {
    setSearchTerm(input)
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  useEffect(
    () => {
      if ([debouncedSearchTerm[0]]) {
        // setIsSearching(true);
        console.log(debouncedSearchTerm[0]);
        axios.get(`${API}/user/search/${debouncedSearchTerm[0]}`)
        .then((res) => {
          // setIsSearching(false);
          console.log(res);
          let newSearchList = res.data.filter((ele) => ele.id != user.id).map((ele) => {
            return {
              value: ele.id,
              label: ele.full_name
            }
          })
          console.log(newSearchList);
          setSearchList(newSearchList);
        });
      } else {
        setSearchList([]);
      }
    },
    [debouncedSearchTerm[0]] // Only call effect if debounced search term changes
  );

  const sidebar = [...chatUsers.keys()]
    .filter((key) => key !== user.id)
    .map((key) => {
      // console.log(key, value);
      return (
        <div class="list-group-item list-group-item-action border-0">
          <div
            class="list-group-item list-group-item-action border-0"
            onClick={() => setActiveChat(key)}
          >
            <div class="d-flex align-items-start">
              <img
                src={`https://secure.gravatar.com/avatar/${key}?s=164&d=identicon`}
                class="rounded-circle mr-1"
                alt={key}
                width="40"
                height="40"
              />
              <div class="flex-grow-1 ml-3">{chatUsers.get(key)}</div>
            </div>
          </div>
        </div>
      );
    });

  const messagePanel = chatData
    .filter(
      (chat) => chat.sender_id == activeChat || chat.reciever_id == activeChat
    )
    .map((chat) => {
      let isoDate = chat.createdAt;
      let result = isoDate.match(/\d\d:\d\d/);
      let time = result[0];
      if (chat.sender_id == activeChat) {
        return (
          <div class="chat-message-left pb-4">
            <div>
              <img
                src={`https://secure.gravatar.com/avatar/${chat.sender_id}?s=164&d=identicon`}
                class="rounded-circle mr-1"
                alt="Sharon Lessman"
                width="40"
                height="40"
              />
              <div class="text-muted small text-nowrap mt-2">{time}</div>
            </div>
            <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
              <div class="font-weight-bold mb-1">{chat.sender}</div>
              {chat.message}
            </div>
          </div>
        );
      } else {
        return (
          <div class="chat-message-right pb-4">
            <div>
              <img
                src={`https://secure.gravatar.com/avatar/${chat.sender_id}?s=164&d=identicon`}
                class="rounded-circle mr-1"
                alt="Chris Wood"
                width="40"
                height="40"
              />
              <div class="text-muted small text-nowrap mt-2">{time}</div>
            </div>
            <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
              <div class="font-weight-bold mb-1">You</div>
              {chat.message}
            </div>
          </div>
        );
      }
    });

  return (
    <>
      <Navbar />
      <main class="content">
        <div class="container p-0">
          <h1 class="h3 mb-3">Messages</h1>

          <div class="card">
            <div class="row g-0">
              <div class="col-12 col-lg-5 col-xl-3 border-right">
                <div class="px-4 d-none d-md-block">
                  <div class="d-flex align-items-center">
                    <div class="flex-grow-1">
                      {/* <input
                        type="text"
                        class="form-control my-3"
                        placeholder="Search..."
                      /> */}
                      <Select
                        // value={selectedOption}
                        options={searchList}
                        onInputChange={handleSearchChange}
                        onChange={handleChange}
                        // styles={customStyles}

                        placeholder="Search..."
                        openMenuOnClick={false}
                        classNamePrefix="select"
                      />
                    </div>
                  </div>
                </div>

                {sidebar}

                {/* <hr class="d-block d-lg-none mt-1 mb-0"/> */}
              </div>
              <div class="col-12 col-lg-7 col-xl-9">
                {activeChat && (
                  <div class="py-2 px-4 border-bottom d-none d-lg-block">
                    <div class="d-flex align-items-center py-1">
                      <div class="position-relative">
                        <img
                          src={`https://secure.gravatar.com/avatar/${activeChat}?s=164&d=identicon`}
                          class="rounded-circle mr-1"
                          alt={activeChat}
                          width="40"
                          height="40"
                        />
                      </div>
                      <div class="flex-grow-1 pl-3">
                        <strong>{chatUsers.get(activeChat)}</strong>
                      </div>
                    </div>
                  </div>
                )}

                <div class="position-relative">
                  <div class="chat-messages p-4">{messagePanel}</div>
                </div>

                <div class="flex-grow-0 py-3 px-4 border-top">
                  {activeChat && (
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Type your message"
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                      />
                      <button
                        class="btn btn-primary"
                        onClick={handleSendMessage}
                      >
                        Send
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Message;
