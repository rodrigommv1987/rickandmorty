import express from "express";

import characterController from "../controller/CharacterController";
import { verifyToken } from "../middleware/auth";

const characterRouter = (RM_API, UserModel) => {
  const characterRoutes = express.Router();
  const controller = characterController(RM_API, UserModel);

  characterRoutes
    .get("/characters", verifyToken, controller.getAllCharacters)
    .get("/characters/:id", verifyToken, controller.getCharacter)
    .get("/characters/page/:number", verifyToken, controller.getPage);

  return characterRoutes;
};
export default characterRouter;
