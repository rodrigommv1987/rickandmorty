import { sendResponse } from "../utils/response";

/**
 * builds an authController using the provided data sources
 * @param {Object} implementation JWT implementation
 * @returns the controller's public interface
 */
const authController = ({ verify }) => {
  const validateToken = async (req, res) => {
    try {
      const { token } = req.body;
      await verify(token);
      return sendResponse(res, 200, true);
    } catch (error) {
      return sendResponse(res, 200, false);
    }
  };

  return {
    /**
     * validates the token sent by the client.
     * @param {express.Request} req express request object
     * @param {express.Response} res express response object
     * @returns {express.Response} wether the token is valid or not
     */
    validateToken,
  };
};

export default authController;
