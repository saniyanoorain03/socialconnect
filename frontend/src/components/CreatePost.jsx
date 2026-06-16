import { useState } from "react";
import API from "../services/api";

function CreatePost({ fetchPosts }) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    try {
      await API.post("/posts", {
        content,
        author: user._id,
      });

      setContent("");
      fetchPosts();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to create post"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-900 border border-slate-700 rounded-2xl p-6 mb-8 shadow-lg"
    >
      <h2 className="text-white text-xl font-semibold mb-4 text-left">
        Create Post
      </h2>

      <textarea
        placeholder="What's happening today?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        maxLength={280}
        rows="4"
        className="w-full bg-slate-800 text-white p-4 rounded-xl outline-none resize-none border border-slate-700 focus:border-blue-500"
      />

      <div className="flex justify-between items-center mt-3">
        <span className="text-slate-400 text-sm">
          {content.length}/280
        </span>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
        >
          Post
        </button>
      </div>
    </form>
  );
}

export default CreatePost;