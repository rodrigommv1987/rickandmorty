import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import FormErrors from "../common/FormErrors";
import InteractiveButton from "../common/InteractiveButton";
import { login } from "../../utils/api";
import { UserContext } from "../App";

export default function Login() {
  const { setToken, setUser } = useContext(UserContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (event, done) => {
    event.preventDefault();
    const errors = [];
    setErrors(errors);
    if (!email) errors.push("Missing email address");
    if (!password) errors.push("Missing password");

    if (errors.length) {
      setErrors(errors);
      done();
      return;
    }

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
      setErrors([msg]);
      done();
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <h1 className="login-title">Log In</h1>
        <form className="login-form">
          <label className="login-form-control">
            Email
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              aria-required="true"
            />
          </label>
          <label className="login-form-control">
            Password
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              aria-required="true"
            />
          </label>
          <FormErrors errors={errors} />
          <div className="login-form-action">
            <InteractiveButton type="submit" onClick={handleSubmit}>
              Sign In!
            </InteractiveButton>
          </div>
        </form>
        <div className="login-more-actions">
          <span>want to create an account?</span>
          <Link to="/register">Register now!</Link>
        </div>
      </div>
    </div>
  );
}
