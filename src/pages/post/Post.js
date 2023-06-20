import { Container } from "@mui/material";
import React from "react";
import { API_URL } from "../../config";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Post() {
  const { id } = useParams();
  const [post, setPosts] = useState(null);
  const [postDeleted, setPostDeleted] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${API_URL}/posts/${id}?_expand=user&_embed=comments`);
      const data = await res.json();
      setPosts(data);
      console.log(data);
    }

    fetchData();
  }, [id]);

  if (!post) {
    return "";
  }

  const deleteHandler = () => {
    axios.delete(`${API_URL}/posts/${id}?_expand=user&_embed=comments`).then((data) => setPostDeleted(true));
  };

  return (
    <Container>
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
            {/* kazkasneveikia, su ejimu i kitus author posts */}

            <p>{post.body}</p>
            {post.comments.map((comment) => (
              <div key={comment.id}>
                <h3>{comment.name}</h3>

                <p>Title: {comment.body}</p>
                <a href={"mailto:" + comment.email}>{comment.email}</a>
              </div>
            ))}
          </>
        )
      )}
    </Container>
  );
}

export default Post;
