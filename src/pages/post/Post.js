import { Container } from "@mui/material";
import React from "react";
import { API_URL } from "../../config";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CreateComment from "../../components/createComment/CreateComment";
import EditPage from "../../components/editPage/EditPage";

function Post() {
  const { id } = useParams();
  const [post, setPosts] = useState(null);
  const [postDeleted, setPostDeleted] = useState(false);

  async function fetchData() {
    const res = await fetch(`${API_URL}/posts/${id}?_expand=user&_embed=comments`);
    const data = await res.json();
    setPosts(data);
    console.log(data);
  }
  useEffect(() => {
    fetchData();
  }, [id]);

  const deleteHandler = () => {
    axios.delete(`${API_URL}/posts/${id}`).then((data) => setPostDeleted(true));
  };
  const deleteCommentHandler = (id) => {
    axios.delete(`${API_URL}/comments/${id}`);
    fetchData();
  };
  return (
    <Container>
      <div>
        <h2>Edit a post:</h2>
        <EditPage></EditPage>
      </div>
      <div>
        <h1>Create Comment</h1>
      </div>
      {postDeleted ? (
        <>
          <h1>Post was deleted</h1>
          <a href={`/json-posts`}>Back to post's</a>
        </>
      ) : (
        post && (
          <>
            <h2>{post.title}</h2>
            <button onClick={deleteHandler}>Delete post</button>
            <a href={`/json-users/${post.user.id}`}>{post.user.name} </a>
            <a href={`/json-posts/${post.user.id}`}>Next author post's </a>

            <p>{post.body}</p>
            <CreateComment></CreateComment>

            {post.comments.length === 0 ? (
              <h1>All comments are deleted</h1>
            ) : (
              post.comments.map((comment) => (
                <div key={comment.id}>
                  <h3>Title: {comment.name}</h3>

                  <button onClick={(event) => deleteCommentHandler(comment.id)}>Delete comment</button>
                  <p>Body: {comment.body}</p>
                  <a href={"mailto:" + comment.email}>{comment.email}</a>
                </div>
              ))
            )}
          </>
        )
      )}
    </Container>
  );
}

export default Post;
