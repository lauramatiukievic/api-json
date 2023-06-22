import React from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { useState, useEffect } from "react";
function CreatePhotos({ albumId }) {
  const [user, setUser] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  useEffect(() => {
    axios.get(`${API_URL}/users`).then((res) => {
      setUser(res.data[0].id);
      setUser(res.data);
    });
  }, []);
  const titleHandler = (event) => setTitle(event.target.value);

  const urlHandler = (event) => setUrl(event.target.value);
  const thumbnailUrlHandler = (event) => setThumbnailUrl(event.target.value);

  const newPostHandler = (event) => {
    event.preventDefault();
    const newPost = {
      albumId: albumId,
      title: title,
      url: url,
      thumbnailUrl: thumbnailUrl,
      userId: Number(user),
    };

    axios.post(`${API_URL}/albums`, newPost).then((res) => console.log(res.data));
  };

  return (
    <form onSubmit={newPostHandler}>
      <div className="form-control">
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={title} onChange={titleHandler} />
      </div>

      <input type="submit" value="Create new abum" />
    </form>
  );
}

export default CreatePhotos;
