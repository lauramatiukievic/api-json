import React from "react";

function SearchOption({ category, onChange }) {
  return (
    <select value={category} onChange={onChange}>
      <option value="" disabled>
        Search any data, or pick by category
      </option>
      <option value="posts">Posts</option>
      <option value="users">Users</option>

      <option value="albums">Albums</option>
    </select>
  );
}

export default SearchOption;
