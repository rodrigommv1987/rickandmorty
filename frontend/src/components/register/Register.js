import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import { register } from "../../utils/api";
import { UserContext } from "../App";

export default function Register() {
  const { setToken } = useContext(UserContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { success, token, msg } = await register({
      email,
      password,
    });

    if (success) {
      setToken(token);
      navigate("/home");
    } else {
      //TODO catch incorrect credentials
      console.log(msg);
    }
  };

  return (
    <div className="login-wrapper">
      <h1>Register new account</h1>
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
        Already have an account? <Link to="/login">Login now!</Link>
      </span>
    </div>
  );
}
