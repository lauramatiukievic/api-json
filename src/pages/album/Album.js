import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";
import { Container } from "@mui/material";
import SimpleGallery from "../../components/simpleGallery/simpleGaller";
import Link from "@mui/material";

function Album() {
  const { id } = useParams();
  const [album, setAlbum] = useState();
  const [albumDeleted, setAlbumDeleted] = useState(false);

  async function fetchData() {
    const res = await axios.get(`${API_URL}/albums/${id}?_expand=user&_embed=photos`);
    console.log(res.data);
    setAlbum(res.data);
  }
  useEffect(() => {
    fetchData();
  }, [id]);

  const getGallery = () => {
    return album.photos.map((albumPhoto) => {
      return { id: albumPhoto.id, largeURL: albumPhoto.url, thumbnailURL: albumPhoto.thumbnailUrl };
    });
  };

  const albumDeleteHandler = () => {
    axios.delete(`${API_URL}/albums/${id}`).then((data) => setAlbumDeleted(true));
  };

  const photoDeleteHandler = async (id) => {
    await axios.delete(`${API_URL}/photos/${id}`);
    await fetchData();
  };

  const albumItem = albumDeleted ? (
    <>
      <h1>Album was deleted</h1>
      <a href={`/json-albums`}>Go back to albums list</a>
    </>
  ) : (
    album && (
      <>
        <div>
          <h3>Album title: {album.title}</h3>
          <button onClick={albumDeleteHandler}>Delete album</button>
          <a href={`/json-users/${album.user.id}`}> {album.user.name} </a>
          <a href={`/json-albums`}>Back to albums...</a>
          <div>
            <SimpleGallery onDelete={photoDeleteHandler} galleryID="my-test-gallery" images={getGallery()} />
          </div>
        </div>
      </>
    )
  );

  return <Container>{albumItem}</Container>;
}

export default Album;
