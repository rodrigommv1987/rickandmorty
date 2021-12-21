import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { UserContext } from "../App";

const Header = () => {
  const activeStyle = ({ isActive }) =>
    `app-nav__nav-link ${isActive ? "is-active" : ""}`;
  const { clearToken, user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignOut = (event) => {
    clearToken();
    navigate("/login");
  };

  return (
    <nav className="app-nav">
      <div className="app-nav__nav-links">
        <NavLink to="/" className={activeStyle}>
          Home
        </NavLink>
        {" | "}
        <NavLink to="/characters" className={activeStyle} end>
          Characters
        </NavLink>
      </div>
      <div className="app-nav__user-data">
        <span className="app-nav__user-name">Hello {user}</span>
        <button className="app-nav__user-action" onClick={handleSignOut}>
          Sign out
        </button>
      </div>
    </nav>
  );
};

export default Header;
