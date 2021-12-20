import { extractCharactersData } from "../utils/characters";
import { sendResponse } from "../utils/response";

const characterController = (RM_API, UserModel) => {
  const getAllCharacters = async (req, res) => {
    try {
      const { data, status } = await RM_API.getCharacters();

      if (status === 200) {
        const { email } = req.user;
        const charactersData = extractCharactersData(data);
        const { favorites } = await UserModel.findOne({ email });

        return sendResponse(res, 200, true, {
          charactersData,
          userData: {
            favorites,
          },
        });
      } else {
        return sendResponse(res, 500, false, {
          msg: "Something went wrong while fetching characters",
        });
      }
    } catch (error) {
      return sendResponse(res, 500, false, {
        msg: "Something went wrong while fetching characters",
      });
    }
  };
  const getCharacter = async function (req, res) {
    const { id } = req.params;

    if (isNaN(+id)) {
      return sendResponse(res, 400, false, {
        msg: "Invalid character id",
      });
    }

    try {
      const { data, status } = await RM_API.getCharacter(+id);

      if (status === 404) {
        return sendResponse(res, 404, false, {
          msg: "Character not found",
        });
      }

      if (status === 200) {
        const { email } = req.user;
        const { favorites } = await UserModel.findOne({ email });

        return sendResponse(res, 200, true, {
          characterData: data,
          userData: {
            favorites,
          },
        });
      }
    } catch (error) {
      return sendResponse(res, 500, false, {
        msg: "Something went wrong while fetching the character",
      });
    }
  };
  const getPage = async function (req, res) {
    const { number } = req.params;

    if (isNaN(+number)) {
      return sendResponse(res, 400, false, {
        msg: "Invalid page number",
      });
    }

    try {
      const { data, status } = await RM_API.getCharacters({ page: +number });

      if (status === 404) {
        return sendResponse(res, 404, false, {
          msg: "Page not found",
        });
      }

      if (status === 200) {
        const charactersData = extractCharactersData(data);

        return sendResponse(res, 200, true, {
          charactersData,
        });
      }
    } catch (error) {
      return sendResponse(res, 500, false, {
        msg: "Something went wrong while fetching the page",
      });
    }
  };

  return {
    getAllCharacters,
    getCharacter,
    getPage,
  };
};

export default characterController;
