import React,{useState} from 'react'
import {isAutheticated} from '../auth/helper/authapicalls'
import axios from 'axios'
import { API } from "../../src/backend";
const {user}= isAutheticated();
function AddComment({questionId,comments}) {
    const [show, setShow] = useState(false);
    const [comment, setComment] = useState("");

    const handleComment = async () => {
        if (comment !== "") {
          const body = {
            parentId: questionId,
            comment: comment,
            userName: user.id,
          };

          return fetch(`${API}/posts/comment`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
          })
            .then(response => {
              return response.json();
            })
            .catch(err => console.log(err));

          
        }
    
        // setShow(true)
      };

      
  return (
    <div className="comments">
                <div className="comment">
                  {comments &&
                    comments.map((_qd) => (
                      <p key={_qd?._id}>
                        {_qd.comment}{" "}
                        <span>
                          - {_qd.user ? _qd.user.displayName : "Nate Eldredge"}
                        </span>{" "}
                        {"    "}
                        <small>
                          {new Date(_qd.created_at).toLocaleString()}
                        </small>
                      </p>
                    ))}
                </div>
                <p onClick={() => setShow(!show)}>Add a comment</p>
                {show && (
                  <div className="title">
                    <textarea
                      style={{
                        margin: "5px 0px",
                        padding: "10px",
                        border: "1px solid rgba(0, 0, 0, 0.2)",
                        borderRadius: "3px",
                        outline: "none",
                      }}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      type="text"
                      placeholder="Add your comment..."
                      rows={5}
                    />
                    <button
                      onClick={handleComment}
                      style={{
                        maxWidth: "fit-content",
                      }}
                    >
                      Add comment
                    </button>
                  </div>
                )}
              </div>
  )
}

export default AddComment