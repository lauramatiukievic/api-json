import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";

const EditPage = () => {
  const { id } = useParams();

  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [user, setUser] = useState("");
  const [isPost, setIsPost] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}/posts/${id}`).then((res) => {
      const post = res.data;

      setTitle(post.title);
      setBody(post.body);
      setUser(post.userId);
    });
  }, [id]);

  useEffect(() => {
    axios.get(`${API_URL}/users`).then((res) => {
      setUsers(res.data);
    });
  }, []);

  const titleHandler = (event) => setTitle(event.target.value);
  const bodyHandler = (event) => setBody(event.target.value);
  const userHandler = (event) => setUser(event.target.value);

  const editPostHandler = (event) => {
    event.preventDefault();

    axios
      .put(`${API_URL}/posts/${id}`, {
        id,
        title,
        body,
        userId: Number(user),
      })
      .then((res) => console.log(res.data));
    setIsPost(false);
  };

  return (
    <>
      {isPost ? (
        <form onSubmit={editPostHandler}>
          <div className="form-control">
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" value={title} onChange={titleHandler} />
          </div>

          <div className="form-control">
            <label htmlFor="body">Body:</label>
            <textarea id="body" name="body" rows="5" cols="30" value={body} onChange={bodyHandler}></textarea>
          </div>

          <div className="form-control">
            <label htmlFor="user">User:</label>
            <select id="user" name="user" value={user} onChange={userHandler}>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <input type="submit" value="Save edited post" />
        </form>
      ) : (
        <button onClick={() => setIsPost(true)}>Edit post</button>
      )}
    </>
  );
};

export default EditPage;
