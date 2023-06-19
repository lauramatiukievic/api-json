import React from "react";

function SearchItem({ searchUsers, searchPosts, searchAlbums }) {
  return (
    <div>
      <ul>
        {searchUsers.map((user) => (
          <li key={user.id}>User: {user.name}</li>
        ))}
      </ul>
      <ul>
        {searchPosts.map((post) => (
          <li key={post.id}>Posts by title: {post.title}</li>
        ))}
      </ul>
      <ul>
        {searchAlbums.map((album) => (
          <li key={album.id}>Albums by title: {album.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchItem;
