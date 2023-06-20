import React from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { useState, useEffect } from "react";

function CreateAlbum() {
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    axios.get(`${API_URL}/users`).then((res) => {
      setUser(res.data[0].id);
      setUsers(res.data);
    });
  }, []);

  const titleHandler = (event) => setTitle(event.target.value);

  const userHandler = (event) => setUser(event.target.value);

  const newPostHandler = (event) => {
    event.preventDefault();
    const newPost = {
      title: title,
      userId: Number(user),
    };

    axios.post(`${API_URL}/albums`, newPost).then((res) => console.log(res.data));
  };

  return (
    <form onSubmit={newPostHandler}>
      <div className="form-control">
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={title} onChange={titleHandler} />
      </div>

      <div className="form-control">
        <label htmlFor="user">User:</label>
        <select id="user" name="user" value={user} onChange={userHandler}>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <input type="submit" value="Create new abum" />
    </form>
  );
}

export default CreateAlbum;
