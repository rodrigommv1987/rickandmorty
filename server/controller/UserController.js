import { sendResponse } from "../utils/response";

const userController = (UserModel, { compare, hash }, { sign }) => {
  const register = async (req, res) => {
    try {
      const { email, password } = req.body;

      const oldUser = await UserModel.findOne({ email });

      if (oldUser) {
        return sendResponse(res, 409, false, {
          msg: "User already exists",
        });
      }

      const encryptedPassword = await hash(password);
      const user = await UserModel.create({
        email: email.toLowerCase(),
        password: encryptedPassword,
        favorite: [],
      });
      const token = await sign({ id: user._id, email });

      return sendResponse(res, 201, true, {
        token,
        email,
      });
    } catch (error) {
      return sendResponse(res, 500, false, {
        msg: "Something went wrong during register",
      });
    }
  };
  const login = async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await UserModel.findOne({ email });

      if (!user) {
        return sendResponse(res, 409, false, {
          msg: "Invalid user or password",
        });
      }

      if (await compare(password.toString(), user.password)) {
        const token = await sign({ id: user._id, email });

        return sendResponse(res, 200, true, {
          token,
          email,
        });
      }

      return sendResponse(res, 409, false, {
        msg: "Invalid user or password",
      });
    } catch (error) {
      return sendResponse(res, 500, false, {
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
      return sendResponse(res, 400, false, {
        msg: "Invalid character id",
      });
    }
    if (status !== "true" && status !== "false") {
      return sendResponse(res, 400, false, {
        msg: "Invalid status",
      });
    }

    try {
      const user = await UserModel.findOne({ email });
      const hasCharacter = user.favorites.includes(+characterId);

      if (status === "true") {
        if (!hasCharacter) user.favorites.push(+characterId);
      } else {
        if (hasCharacter) {
          user.favorites = user.favorites.filter(
            (currentCharacterId) => currentCharacterId != +characterId
          );
        }
      }
      user.save();

      return sendResponse(res, 200, true, {
        userData: {
          favorites: user.favorites,
        },
      });
    } catch (error) {
      return sendResponse(res, 500, false, {
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
