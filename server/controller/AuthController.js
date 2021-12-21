import { verify } from "../utils/jwt";
import { sendResponse } from "../utils/response";

const authController = () => {
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
    validateToken,
  };
};

export default authController;
