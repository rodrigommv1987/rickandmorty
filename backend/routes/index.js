import { getCharacters, getCharacter } from "rickmortyapi";

import authRoutes from "./AuthRoutes";
import characterRouter from "./CharacterRoutes";
import userRouter from "./UserRoutes";
import UserModel from "../models/UserModel";

const loadRoutes = (app) => {
  app.use(authRoutes);

  const characterRoutes = characterRouter(
    { getCharacters, getCharacter },
    UserModel
  );
  app.use(characterRoutes);

  const userRoutes = userRouter(UserModel);
  app.use(userRoutes);
};

export default loadRoutes;
