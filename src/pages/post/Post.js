import { Container } from "@mui/material";
import React from "react";
import { API_URL } from "../../config";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Post() {
  const { id } = useParams();
  const [post, setPosts] = useState(null);
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

  return (
    <Container>
      <h2>{post.title}</h2>
      <a href={`/json-users/${post.user.id}`}>{post.user.name} </a>
      <a href={`/json-posts`}>Next author post's </a>
      {/* kazkasneveikia, su ejimu i kitus author posts */}
      <a href={`/json-posts`}>Back to post's</a>
      <p>{post.body}</p>
      {post.comments.map((comment) => (
        <div>
          <h3>{comment.name}</h3>
          <p>Title: {comment.body}</p>
          <a href={"mailto:" + comment.email}>{comment.email}</a>
        </div>
      ))}
    </Container>
  );
}

export default Post;
