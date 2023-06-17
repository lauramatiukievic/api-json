import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";

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
      <h1>Users:</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/json-users/${user.id}`}>
              {user.name} (Post total: {users.length})
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default Users;
