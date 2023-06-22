import { Container } from "@mui/material";
import React from "react";
import { API_URL } from "../../config";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import EditPage from "../../components/editPage/EditPage";

import CommentForm from "../../components/commentForm/CommentForm";

function Post(props) {
  const { id } = useParams();
  const [post, setPosts] = useState(null);
  const [postDeleted, setPostDeleted] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);

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
    if (id === selectedComment.id) {
      setSelectedComment(null);
    }
    axios.delete(`${API_URL}/comments/${id}`).catch((e) => console.error(e));

    fetchData();
  };

  const editCommentHandler = (comment) => {
    axios.put(`${API_URL}/comments/${comment.id}`, comment).then((res) => console.log(res.data));
    setSelectedComment(null);
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
          <Link to={`/json-posts`}>Back to post's</Link>
        </>
      ) : (
        post && (
          <>
            <h2>{post.title}</h2>
            <button onClick={deleteHandler}>Delete post</button>
            <Link to={`/json-users/${post.user.id}`}>{post.user.name} </Link>
            <Link to={`/json-posts/${post.user.id}`}>Next author post's </Link>

            <p>{post.body}</p>
            <CommentForm onCreate={fetchData} onEdit={editCommentHandler} postId={id} selectedComment={selectedComment} />

            {post.comments.length === 0 ? (
              <h1>All comments are deleted</h1>
            ) : (
              post.comments.map((comment) => (
                <div key={comment.id}>
                  <h3>Title: {comment.name}</h3>

                  <button onClick={(event) => deleteCommentHandler(comment.id)}>Delete comment</button>
                  <button onClick={() => setSelectedComment(comment)}>Edit Comment</button>
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
