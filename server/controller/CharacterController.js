import { extractCharactersData } from "../utils/characters";
import { sendResponse } from "../utils/response";

/**
 * builds a characterController using the provided data sources
 * @param {Object} RM_API Rick and Morty API functions
 * @param {mongoose.Model} UserModel mongoose User model
 * @returns the controller's public interface
 */
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
    /**
     * gets all characters and the user's favorite characters
     * @param {express.Request} req express request object
     * @param {express.Response} res express response object
     * @returns {express.Response} all characters from first page and the current user's favorites characters
     */
    getAllCharacters,
    /**
     * gets a specific character and the user's favorite characters
     * @param {express.Request} req express request object
     * @param {express.Response} res express response object
     * @returns {express.Response} a character and the current user's favorites characters
     */
    getCharacter,
    /**
     * gets all characters in the specified page number
     * @param {express.Request} req express request object
     * @param {express.Response} res express response object
     * @returns {express.Response} all characters in the specified page number
     */
    getPage,
  };
};

export default characterController;
