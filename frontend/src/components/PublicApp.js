import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "./login/Login";
import Register from "./register/Register";

export default function PublicApp() {
  return (
    <Routes>
      <Route path="register" element={<Register />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}
