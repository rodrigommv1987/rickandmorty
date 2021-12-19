import express from "express";

import userController from "../controller/UserController";
import { verifyToken } from "../middleware/auth";
import { userInputValidation } from "../middleware/userInputValidation";

const userRouter = (UserModel) => {
  const userRoutes = express.Router();
  const controller = userController(UserModel);

  userRoutes
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
