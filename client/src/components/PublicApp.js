import React, { useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

import Login from "./login/Login";
import Register from "./register/Register";

export default function PublicApp() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "register") navigate("/login");
  }, []);

  return (
    <Routes>
      <Route path="register" element={<Register />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}
