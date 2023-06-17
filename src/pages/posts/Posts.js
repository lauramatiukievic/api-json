import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_URL, POSTS_PER_PAGE } from "../../config";
import Container from "../../components/container/Container";
import axios from "axios";
import { Link } from "react-router-dom";

function Posts() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`${API_URL}/posts?_limit=${POSTS_PER_PAGE}&_expand=user&_embed=comments`, `${API_URL}/posts?_limit=${POSTS_PER_PAGE}&_expand=user&_embed=comments&userId=${id}`);
      setPosts(res.data);
      console.log(res.data);
    }

    fetchData();
  }, []);

  return (
    <Container>
      <h2>Posts</h2>
      {posts.map((post) => (
        <li key={post.id}>
          <Link to={`/json-posts/${post.id}`}>
            <Link to={`/json-users/${post.user.id}`}>Author: {post.user.name}</Link>
            Title: {post.title} ({post.comments.length} comments)
          </Link>
        </li>
      ))}
    </Container>
  );
}

export default Posts;
