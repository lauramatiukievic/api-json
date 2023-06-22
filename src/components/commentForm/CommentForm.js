import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../config";

function CommentForm({ onCreate, onEdit, postId, selectedComment }) {
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (selectedComment) {
      setName(selectedComment.name);
      setBody(selectedComment.body);
      setEmail(selectedComment.email);
    } else {
      clearFields();
    }
  }, [selectedComment]);

  const nameHandler = (event) => setName(event.target.value);
  const bodyHandler = (event) => setBody(event.target.value);
  const emailHandler = (event) => setEmail(event.target.value);

  const newCommentHandler = (event) => {
    event.preventDefault();
    const newComment = {
      postId: Number(postId),
      name: name,
      body: body,
      email: email,
    };

    axios.post(`${API_URL}/comments`, newComment).then((res) => console.log(res.data));
    onCreate();
    clearFields();
  };

  const editCommentHandler = (event) => {
    event.preventDefault();
    const editedComment = {
      id: selectedComment.id,
      name: name,
      body: body,
      email: email,
      postId: selectedComment.postId,
    };
    onEdit(editedComment);
    clearFields();
  };

  const clearFields = () => {
    setName("");
    setBody("");
    setEmail("");
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
      {selectedComment ? <button onClick={editCommentHandler}>Save edit comment</button> : <input type="submit" value="Create new comment" />}
    </form>
  );
}

export default CommentForm;
