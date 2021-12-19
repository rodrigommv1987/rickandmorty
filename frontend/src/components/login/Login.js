import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import { login } from "../../utils/api";
import { UserContext } from "../App";

export default function Login() {
  const { setToken, setUser } = useContext(UserContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {
      success,
      data: { token, msg },
    } = await login({
      email,
      password,
    });

    if (success) {
      setUser(email);
      setToken(token);
      navigate("/");
    } else {
      //TODO catch incorrect credentials
      console.log(msg);
    }
  };

  return (
    <div className="login-wrapper">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Sign In</button>
        </div>
      </form>
      <span>
        want to create an account? <Link to="/register">Register now!</Link>
      </span>
    </div>
  );
}
