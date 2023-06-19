import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Navigation.css";
import SearchForm from "../searchComp/searchForm/SearchForm";

function Navigation() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const sumbitHandler = (event, category, search) => {
    event.preventDefault();
    navigate("/json-search", { state: { search } });
  };

  return (
    <nav className="page-header">
      <a className="header-title" href="./home">
        API Project
      </a>
      <ul className="link-list">
        <li className="nav-list">
          <NavLink to="/home" className="nav-link">
            Home
          </NavLink>
        </li>

        <li className="nav-list">
          <NavLink to="/json-users" className="nav-link">
            Users
          </NavLink>
        </li>
        <li className="nav-list">
          <NavLink to="/json-posts" className="nav-link">
            Posts
          </NavLink>
        </li>
        <li className="nav-list">
          <NavLink to="/json-albums" className="nav-link">
            Albums
          </NavLink>
        </li>
        <li className="nav-list">
          <NavLink to="/json-search" className="nav-link">
            Search
          </NavLink>
        </li>
      </ul>
      {pathname !== "/json-search" && <SearchForm withCategory={false} onSubmit={sumbitHandler}></SearchForm>}
    </nav>
  );
}
export default Navigation;
