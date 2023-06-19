import React from "react";
import Container from "../../components/container/Container";
import { useState } from "react";

import { API_URL } from "../../config";
import axios from "axios";
import SearchForm from "../../components/searchComp/searchForm/SearchForm";
import SearchItem from "../../components/searchComp/searchItem/SearchItem";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function Search() {
  const location = useLocation();
  const [searchUsers, setSearchUsers] = useState([]);
  const [searchPosts, setSearchPosts] = useState([]);
  const [searchAlbums, setSearchAlbums] = useState([]);
  useEffect(() => {
    if (location.state) {
      console.log(location);

      searchData(location.state.search, null);
    }
  }, []);

  const submitHandler = async (event, category, search) => {
    event.preventDefault();
    setSearchUsers([]);
    setSearchPosts([]);
    setSearchAlbums([]);
    searchData(search, category);
  };

  const searchData = async (search, category) => {
    if (!category) {
      getUsers(search);
      getPosts(search);
      getAlbums(search);
    } else if (category === "users") {
      getUsers(search);
    } else if (category === "posts") {
      getPosts(search);
    } else if (category === "albums") {
      getAlbums(search);
    }
  };

  const getUsers = async (search) => {
    const resUsers = await axios.get(`${API_URL}/users?q=${search}`);
    setSearchUsers(resUsers.data);
    console.log(resUsers.data);
  };

  const getPosts = async (search) => {
    const resPosts = await axios.get(`${API_URL}/posts?q=${search}`);
    setSearchPosts(resPosts.data);
  };

  const getAlbums = async (search) => {
    const resAlbums = await axios.get(`${API_URL}/albums?q=${search}`);
    setSearchAlbums(resAlbums.data);
  };

  return (
    <Container>
      <SearchForm withCategory={true} onSubmit={submitHandler}></SearchForm>
      <SearchItem searchUsers={searchUsers} searchPosts={searchPosts} searchAlbums={searchAlbums}></SearchItem>
    </Container>
  );
}

export default Search;
