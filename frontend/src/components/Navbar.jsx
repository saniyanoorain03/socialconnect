import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-950 border-b border-slate-800 px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-white">
        SocialConnect
      </h1>

      <div className="flex items-center gap-8">
        <Link
          to="/"
          className="text-slate-300 hover:text-white transition"
        >
          Home
        </Link>

        <Link
          to="/profile"
          className="text-slate-300 hover:text-white transition"
        >
          Users
        </Link>

        <div className="text-slate-400 text-sm">
          @{user?.username}
        </div>

        <button
          onClick={handleLogout}
          className="text-red-400 hover:text-red-300 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;