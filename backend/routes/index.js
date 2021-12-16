import characterRoutes from './CharacterRoutes';
import userRouter from './UserRoutes';
import UserModel from '../models/UserModel';

const loadRoutes = (app) => {
  app.use(characterRoutes);

  const userRoutes = userRouter(UserModel);
  app.use(userRoutes);
}

export default loadRoutes