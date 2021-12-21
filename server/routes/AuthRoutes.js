import express from "express";

import authController from "../controller/AuthController";

const authRoutes = express.Router();
const controller = authController();

authRoutes.post("/validateToken", controller.validateToken);

export default authRoutes;
