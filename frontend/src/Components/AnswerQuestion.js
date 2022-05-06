import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // ES6
import "./css/AnswerQuestion.css";
import Editor from "react-quill/lib/toolbar";
import axios from "axios";
import { TagsInput } from "react-tag-input-component";
// import { selectUser } from "../../feature/userSlice";
import { useHistory } from "react-router-dom";
// import ChipsArray from "./TagsInput";

function AskQuestion() {
  // const user = useSelector(selectUser);
  var toolbarOptions = [
    ["bold", "italic", "underline", "strike"], 
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], 
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }], 
    [{ direction: "rtl" }], 

    [{ size: ["small", false, "large", "huge"] }], 
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], 
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], 
  ];
  Editor.modules = {
    syntax: false,
    toolbar: toolbarOptions,
    clipboard: {
      matchVisual: false,
    },
  };
  
  Editor.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState([]);
  const history = useHistory();

  const handleQuill = (value) => {
    setBody(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(body);
    if (title !== "" && body !== "") {
      const bodyJSON = {
        title: title,
        body: body,
        tag: JSON.stringify(tag)
        // user: user,
      };
      await axios
        .post("/api/question", bodyJSON)
        .then((res) => {
          // console.log(res.data);
          alert("Question added successfully");
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="add-question1">
      <div className="add-question-container">
        <div className="question-container1">
          <div className="question-options">
            <div className="question-option">
              <div className="title">
                <ReactQuill
                  value={body}
                  onChange={handleQuill}
                  modules={Editor.modules}
                  className="react-quill"
                  theme="snow"
                />
              </div>
            </div>
          </div>
        </div>

        <button onClick={handleSubmit} className="button">
          Post your answer
        </button>
      </div>
    </div>
  );
}

export default AskQuestion;