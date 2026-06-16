import { useEffect, useState } from "react";
import API from "../services/api";

function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await API.get(`/comments/${postId}`);
      setComments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = async () => {
    if (!text.trim()) return;

    const user = JSON.parse(localStorage.getItem("user"));

    try {
      await API.post("/comments", {
        text,
        user: user.id,
        post: postId,
      });

      setText("");
      fetchComments();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        marginTop: "20px",
        borderTop: "1px solid #233554",
        paddingTop: "15px",
      }}
    >
      {/* Comment Input */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "15px",
        }}
      >
        <input
          type="text"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #334155",
            background: "#1e293b",
            color: "white",
            outline: "none",
          }}
        />

        <button
          onClick={handleComment}
          style={{
            padding: "12px 20px",
            border: "none",
            borderRadius: "10px",
            background: "#2563eb",
            color: "white",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Comment
        </button>
      </div>

      {/* Comments */}
      <div>
        {comments.map((comment) => (
          <div
            key={comment._id}
            style={{
              background: "#1e293b",
              padding: "10px 15px",
              borderRadius: "10px",
              marginBottom: "10px",
              textAlign: "left",
            }}
          >
            <strong
              style={{
                color: "#60a5fa",
              }}
            >
              {comment.user?.username}
            </strong>

            <p
              style={{
                marginTop: "5px",
                color: "#e2e8f0",
              }}
            >
              {comment.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentSection;