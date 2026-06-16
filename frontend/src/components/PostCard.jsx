import API from "../services/api";
import CommentSection from "./CommentSection";

function PostCard({ post, fetchPosts }) {
  const handleLike = async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));

    try {
      await API.put(`/posts/${id}/like`, {
        userId: user.id,
      });

      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
          {post.author?.username?.charAt(0).toUpperCase()}
        </div>

        <div>
          <h3 className="text-white font-semibold text-lg">
            {post.author?.username}
          </h3>

          <p className="text-slate-500 text-xs">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Post Content */}
      <div className="mb-5">
        <p className="text-slate-200 text-lg leading-relaxed">
          {post.content}
        </p>
      </div>

      {/* Like & Comment Stats */}
      <div className="flex items-center gap-8 text-slate-300 border-t border-b border-slate-800 py-3 mb-4">
        <button
          onClick={() => handleLike(post._id)}
          className="hover:text-pink-400 transition flex items-center gap-2"
        >
          <span>❤️</span>
          <span>{post.likes?.length || 0} Likes</span>
        </button>

        <span className="flex items-center gap-2">
          💬 Comments
        </span>
      </div>

      {/* Comments Section */}
      <CommentSection postId={post._id} />
    </div>
  );
}

export default PostCard;