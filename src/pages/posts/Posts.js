import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_URL, POSTS_PER_PAGE } from "../../config";
import Container from "../../components/container/Container";
import axios from "axios";
import { Link } from "react-router-dom";
import CreatePost from "../../components/createPost/CreatePost";

function Posts() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let fetchUrl;
      if (id) {
        fetchUrl = `${API_URL}/posts?_limit=${POSTS_PER_PAGE}&_expand=user&_embed=comments&userId=${id}`;
      } else {
        fetchUrl = `${API_URL}/posts?_limit=${POSTS_PER_PAGE}&_expand=user&_embed=comments`;
      }
      const res = await axios.get(fetchUrl);
      setPosts(res.data);
      console.log(res.data);
    }

    fetchData();
  }, [id]);

  return (
    <Container>
      <div>
        <h2>Create a new post</h2>
        <CreatePost></CreatePost>
      </div>

      <h2>Posts</h2>

      {posts.map((post) => (
        <li key={post.id}>
          <Link to={`/json-users/${post.user.id}`}>Author: {post.user.name}</Link>
          <Link to={`/json-post/${post.id}`}>
            Title: {post.title} ({post.comments.length} comments)
          </Link>
        </li>
      ))}
    </Container>
  );
}

export default Posts;
