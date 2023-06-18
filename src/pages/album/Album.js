import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";
import { Container } from "@mui/material";
import SimpleGallery from "../../components/simpleGallery/simpleGaller";

function Album() {
  const { id } = useParams();
  const [album, setAlbum] = useState();

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`${API_URL}/albums/${id}?_expand=user&_embed=photos`);
      console.log(res.data);
      setAlbum(res.data);
    }
    fetchData();
  }, [id]);

  const getGallery = () => {
    return album.photos.map((albumPhoto) => {
      return { largeURL: albumPhoto.url, thumbnailURL: albumPhoto.thumbnailUrl };
    });
  };

  const albumItem = album && (
    <div>
      <h3>Album title: {album.title}</h3>
      <a href={`/json-users/${album.user.id}`}> {album.user.name} </a>
      <a href={`/json-albums`}>Back to albums...</a>
      <div>
        <SimpleGallery galleryID="my-test-gallery" images={getGallery()} />
      </div>
    </div>
  );

  return <Container>{albumItem}</Container>;
}

export default Album;
