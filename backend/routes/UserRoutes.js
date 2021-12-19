import "dotenv/config.js";
import express from "express";

import userController from "../controller/UserController";
import { verifyToken } from "../middleware/auth";
import { userInputValidation } from "../middleware/userInputValidation";
import { verify } from "../utils/jwt";

const userRouter = (UserModel) => {
  const userRoutes = express.Router();
  const controller = userController(UserModel);

  userRoutes
    .post("/validateToken", async (req, res) => {
      // setTimeout(async () => {
      try {
        const { token } = req.body;
        await verify(token);
        res.status(200);
        return res.json({
          success: true,
        });
      } catch (error) {
        // console.log(error);
        res.status(200);
        return res.json({
          success: false,
        });
      }
      // }, 1000);
    })
    .post("/register", userInputValidation, controller.register)
    .post("/login", userInputValidation, controller.login)
    .patch(
      "/favorites/:characterId/:status",
      verifyToken,
      controller.updateFavorite
    );

  return userRoutes;
};

export default userRouter;
