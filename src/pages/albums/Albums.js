import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL, ALBUMS_PER_PAGE } from "../../config";
import Container from "../../components/container/Container";

function Albums() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`${API_URL}/albums?_limit=${ALBUMS_PER_PAGE}&_expand=user&_embed=photos`);
      setAlbums(res.data);
      console.log(res.data);
    }
    fetchData();
  }, []);

  return (
    <Container>
      {albums.map((album) => (
        <div key={album.id}>
          <h3>Albums title:{album.title}</h3>
          <span>By: {album.user.name}</span>
          <p>Photos:{album.photos.length}</p>
          <a href={`/json-albums/${album.id}`}>
            <img alt="" src={album.photos[0].thumbnailUrl} />
          </a>
        </div>
      ))}
    </Container>
  );
}

export default Albums;
