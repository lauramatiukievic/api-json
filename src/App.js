import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Container from "./components/container/Container";
import User from "./pages/user/User";
import Users from "./pages/users/Users";
import Navigation from "./components/navigation/Navigation";
import Post from "./pages/post/Post";
import Posts from "./pages/posts/Posts";
import Albums from "./pages/albums/Albums";
import Album from "./pages/album/Album";

function App() {
  return (
    <div className="App">
      <Container classes="custom-container">
        <Navigation />
      </Container>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/json-users/:id" element={<User>Home Page</User>} />
        <Route path="/json-users" element={<Users>Home Page</Users>} />
        <Route path="/json-posts/:id" element={<Post>Home Page</Post>} />
        <Route path="/json-posts/" element={<Posts>Home Page</Posts>} />
        <Route path="/json-albums/:id" element={<Album>Home Page</Album>} />
        <Route path="/json-albums/" element={<Albums>Home Page</Albums>} />
        <Route
          path="*"
          element={
            <div>
              <h1>404 error. Page not found</h1>
              <Link to="/">Go Back to home page</Link>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
