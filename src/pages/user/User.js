import React, { useEffect, useState } from "react";
import Container from "../../components/container/Container";
import { API_URL } from "../../config";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import EditUser from "../../components/editUser/EditUser";

function User() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [userDeleted, setUserDeleted] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${API_URL}/users/${id}?_embed=posts&_embed=albums`);
      const data = await res.json();
      setUser(data);
      console.log(data);
    }

    fetchData();
  }, [id]);

  if (!user) {
    return "";
  }

  const userDeleteHandler = () => {
    axios.delete(`${API_URL}/users/${id}`).then((data) => setUserDeleted(true));
  };
  return (
    <Container>
      <div>
        <h2>Edit a user:</h2>
        <EditUser></EditUser>
      </div>
      {userDeleted ? (
        <>
          <h1>User was deleted</h1>
          <Link to="/json-users">Go back to user list</Link>
        </>
      ) : (
        user && (
          <>
            <h1> User Info:</h1>
            <p>{user.name}</p>
            <button onClick={userDeleteHandler}>Delete User</button>
            <p>{user.username}</p>
            <a href={"mailto:" + user.email}>{user.email}</a>

            <a href={"tel:" + user.phone}>{user.phone}</a>
            <h3>Adress:</h3>
            <a href={`https://www.google.com/maps?q=${user.address.geo.lat},${user.address.geo.lng}`}>
              <p>
                Street:
                {user.address.street}
                {user.address.street}
                {user.address.suite}
                {user.address.city}
                {user.address.zipcode}
              </p>
            </a>
            <a href={user.website}>Website: {user.website}</a>
            <h4>Work place: {user.company.name}</h4>
          </>
        )
      )}

      <ul>
        {" "}
        Posts:
        {user.posts.map((userPost) => (
          <li key={userPost.id}>
            <a href={`/json-post/${userPost.id}`}>Post Title: {userPost.title}</a>
          </li>
        ))}
      </ul>

      <ul>
        Albums:
        {user.albums.map((userAlbum) => (
          <li key={userAlbum.id}>
            <a href={`/json-albums/${userAlbum.id}`}>Album Title: {userAlbum.title}</a>
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default User;
