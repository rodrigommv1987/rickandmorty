import express from "express";

import authController from "../controller/AuthController";

const authRouter = (jwt) => {
  const authRoutes = express.Router();
  const controller = authController(jwt);

  authRoutes.post("/validateToken", controller.validateToken);
  return authRoutes;
};
export default authRouter;
