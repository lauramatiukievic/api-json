import React from "react";

import { useState } from "react";
import SearchOption from "../searchOption/SearchOption";

function SearchForm({ onSubmit, withCategory }) {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  const searchInputHandler = (event) => setSearch(event.target.value);
  const categoryHandler = (event) => {
    setCategory(event.target.value);
  };

  return (
    <form
      onSubmit={(event) => {
        onSubmit(event, category, search);
      }}
    >
      {withCategory && <SearchOption category={category} onChange={categoryHandler}></SearchOption>}

      <input type="text" value={search} onChange={searchInputHandler}></input>
      <input type="submit"></input>
    </form>
  );
}

export default SearchForm;
