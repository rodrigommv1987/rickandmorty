import { getCharacters, getCharacter } from "rickmortyapi";

import authRouter from "./AuthRoutes";
import characterRouter from "./CharacterRoutes";
import userRouter from "./UserRoutes";
import UserModel from "../models/UserModel";
import * as bcrypt from "../utils/bcrypt";
import * as jwt from "../utils/jwt";

const loadRoutes = (app) => {
  const authRoutes = authRouter(jwt);
  app.use(authRoutes);

  const characterRoutes = characterRouter(
    { getCharacters, getCharacter },
    UserModel
  );
  app.use(characterRoutes);

  const userRoutes = userRouter(UserModel, bcrypt, jwt);
  app.use(userRoutes);
};

export default loadRoutes;
