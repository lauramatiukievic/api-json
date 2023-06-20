import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";
import "./Users.css";

import Container from "../../components/container/Container";
import CreateUser from "../../components/createUser/CreateUser";

const Users = () => {
  const [users, setUsers] = useState([]);

  async function fetchData() {
    const res = await axios.get(`${API_URL}/users?_embed=posts`);
    setUsers(res.data);
    console.log(res.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <h1>Create user</h1>
      <CreateUser onCreate={fetchData}></CreateUser>
      <div className="users-container">
        <h1>Users:</h1>
        <ul>
          {users.map((user) => (
            <li className="users-name" key={user.id}>
              <Link className="users-link" to={`/json-users/${user.id}`}>
                {user.name} (Post total: {user.posts.length})
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default Users;
