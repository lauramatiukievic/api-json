import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../config";

function CreateComment() {
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    axios.get(`${API_URL}/users`).then((res) => {
      setUser(res.data[0].id);
      setUser(res.data);
    });
  }, []);

  const nameHandler = (event) => setName(event.target.value);
  const bodyHandler = (event) => setBody(event.target.value);
  const emailHandler = (event) => setEmail(event.target.value);

  const newCommentHandler = (event) => {
    event.preventDefault();
    const newComment = {
      name: name,
      body: body,
      email: email,
      userId: Number(user),
    };

    axios.post(`${API_URL}/comments`, newComment).then((res) => console.log(res.data));
  };

  return (
    <form onSubmit={newCommentHandler}>
      <div className="form-control">
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={name} onChange={nameHandler} />
      </div>

      <div className="form-control">
        <label htmlFor="body">Body:</label>
        <textarea id="body" name="body" rows="5" cols="30" value={body} onChange={bodyHandler}></textarea>
      </div>

      <div className="form-control">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={email} onChange={emailHandler} />
      </div>

      <input type="submit" value="Create new comment" />
    </form>
  );
}

export default CreateComment;
