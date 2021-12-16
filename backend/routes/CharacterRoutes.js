import express from "express";
import { getCharacters, getCharacter } from "rickmortyapi";

import characterController from "../controller/CharacterController";
import { verifyToken } from "../middleware/auth";

const controller = characterController({ getCharacters, getCharacter });
const characterRoutes = express.Router();

characterRoutes
  .get("/characters", verifyToken, controller.getAllCharacters)
  .get("/characters/:id", verifyToken, controller.getCharacter)
  .get("/characters/page/:number", verifyToken, controller.getPage);

export default characterRoutes;
