import { getCharacters, getCharacter } from "rickmortyapi";

import characterRouter from "./CharacterRoutes";
import userRouter from "./UserRoutes";
import UserModel from "../models/UserModel";

const loadRoutes = (app) => {
  const characterRoutes = characterRouter(
    { getCharacters, getCharacter },
    UserModel
  );
  app.use(characterRoutes);

  const userRoutes = userRouter(UserModel);
  app.use(userRoutes);
};

export default loadRoutes;
