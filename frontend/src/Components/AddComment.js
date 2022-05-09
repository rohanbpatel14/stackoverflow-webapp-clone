import React,{useState} from 'react'

function AddComment({questionId,comments}) {
    const [show, setShow] = useState(false);
    const [comment, setComment] = useState("");

    const handleComment = async () => {
        if (comment !== "") {
          const body = {
            question_id: questionId,
            comment: comment,
            user: 5,
          };
          // await axios.post(`/api/comment/${id}`, body).then((res) => {
          //   setComment("");
          //   setShow(false);
          //   getUpdatedAnswer();
          //   // console.log(res.data);
          // });
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