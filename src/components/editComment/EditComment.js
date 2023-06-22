import React from "react";

import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";

function EditComment({ comment }) {
  const [name, setName] = useState(comment.name);
  const [body, setBody] = useState(comment.body);
  const [email, setEmail] = useState(comment.email);
  const [isComment, setIsComment] = useState(false);

  const nameHandler = (event) => setName(event.target.value);
  const bodyHandler = (event) => setBody(event.target.value);
  const emailHandler = (event) => setEmail(event.target.value);

  const editCommentHandler = (event) => {
    event.preventDefault();

    axios
      .put(`${API_URL}/comments/${comment.id}`, {
        id: comment.id,
        name: name,
        body: body,
        email: email,
        postId: comment.postId,
      })
      .then((res) => console.log(res.data));
    setIsComment(false);
  };

  return (
    <>
      {isComment ? (
        <form onSubmit={editCommentHandler}>
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

          <input type="submit" value="Save edited comment" />
        </form>
      ) : (
        <button onClick={() => setIsComment(true)}>Edit Comment</button>
      )}
    </>
  );
}

export default EditComment;
