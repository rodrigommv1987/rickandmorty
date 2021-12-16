import { compare, hash } from "../utils/bcrypt";
import { sign } from "../utils/jwt";

const userController = (UserModel) => {
  const register = async (req, res) => {
    try {
      const { email, password } = req.body;

      const oldUser = await UserModel.findOne({ email });

      if (oldUser) {
        res.status(409);
        return res.json({
          success: false,
          msg: "User already exists",
        });
      }

      const encryptedPassword = await hash(password);
      const user = await UserModel.create({
        email: email.toLowerCase(),
        password: encryptedPassword,
        favorite: [],
        token: "",
      });
      const token = await sign({ id: user._id, email });
      user.token = token;
      user.save();

      res.status(201);
      return res.json({
        success: true,
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500);
      return res.json({
        success: false,
        msg: "Something went wrong during register",
      });
    }
  };
  const login = async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await UserModel.findOne({ email });

      if (!user) {
        res.status(409);
        return res.json({
          success: false,
          msg: "Invalid user or password",
        });
      }

      if (await compare(password.toString(), user.password)) {
        const token = await sign({ id: user._id, email });
        user.token = token;
        user.save();

        res.status(200);
        return res.json({
          success: true,
          user,
        });
      }

      res.status(409);
      return res.json({
        success: false,
        msg: "Invalid user or password",
      });
    } catch (error) {
      console.log(error);
      res.status(500);
      return res.json({
        success: false,
        msg: "Something went wrong during login",
      });
    }
  };
  const updateFavorite = async function (req, res) {
    const { characterId, status } = req.params;
    const {
      user: { email },
    } = req;

    if (isNaN(+characterId)) {
      res.status(400);
      return res.json({
        success: false,
        msg: "Invalid character id",
      });
    }
    if (status !== "true" && status !== "false") {
      res.status(400);
      return res.json({
        success: false,
        msg: "Invalid status",
      });
    }

    try {
      const user = await UserModel.findOne({ email });
      const hasCharacter = user.favorites.includes(characterId);

      if (status === "true") {
        if (!hasCharacter) user.favorites.push(characterId);
      } else {
        if (hasCharacter) {
          user.favorites = user.favorites.filter(
            (currentCharacterId) => currentCharacterId != characterId
          );
        }
      }
      user.save();

      res.status(200);
      return res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.status(500);
      return res.json({
        success: false,
        msg: "Something went wrong while saving the favorite",
      });
    }
  };

  return {
    login,
    register,
    updateFavorite,
  };
};

export default userController;
