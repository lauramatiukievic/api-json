import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";
import "./Users.css";

import Container from "../../components/container/Container";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`${API_URL}/users?_embed=posts`);
      setUsers(res.data);
      console.log(res.data);
    }

    fetchData();
  }, []);

  return (
    <Container>
      <div className="users-container">
        <h1>Users:</h1>
        <ul>
          {users.map((user) => (
            <li className="users-name" key={user.id}>
              <Link className="users-link" to={`/json-users/${user.id}`}>
                {user.name} (Post total: {users.length})
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default Users;
