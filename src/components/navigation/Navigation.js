import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
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
      </ul>
    </nav>
  );
}
export default Navigation;
