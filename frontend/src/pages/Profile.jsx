import { useEffect, useState } from "react";
import API from "../services/api";

function Profile() {
  const [users, setUsers] = useState([]);

  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollow = async (userId) => {
    try {
      await API.put(`/users/${userId}/follow`, {
        userId: currentUser.id,
      });

      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      await API.put(`/users/${userId}/unfollow`, {
        userId: currentUser.id,
      });

      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Users</h1>

      {users
        .filter((user) => user._id !== currentUser.id)
        .map((user) => {
          const isFollowing =
            user.followers?.includes(currentUser.id);

          return (
            <div
              key={user._id}
              style={{
                border: "1px solid gray",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "10px",
              }}
            >
              <h3>{user.username}</h3>

              <p>{user.email}</p>

              <p>
                Followers: {user.followers?.length || 0}
              </p>

              {isFollowing ? (
                <button
                  onClick={() =>
                    handleUnfollow(user._id)
                  }
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={() =>
                    handleFollow(user._id)
                  }
                >
                  Follow
                </button>
              )}
            </div>
          );
        })}
    </div>
  );
}

export default Profile;