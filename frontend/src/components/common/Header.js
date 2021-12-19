import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { UserContext } from "../App";

const Header = () => {
  const activeStyle = ({ isActive }) => (isActive ? "is-active" : undefined);
  const { clearToken, user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignOut = (event) => {
    clearToken();
    navigate("/login");
  };

  return (
    <nav>
      <NavLink to="/" className={activeStyle}>
        Home
      </NavLink>
      {" | "}
      <NavLink to="/characters" className={activeStyle}>
        {" "}
        Characters
      </NavLink>
      <span>Hello {user}</span>
      <button onClick={handleSignOut}>Sign out</button>
    </nav>
  );
};

export default Header;
