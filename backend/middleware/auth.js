import { verify } from "../utils/jwt";
import { sendResponse } from "../utils/response";

/**
 * validates user token, allows request to continue if all good and returns in case
 * token is either missing, does not verifies correctly or expired
 * @param {express.Request} req express request object
 * @param {express.Response} res express response object
 * @param {express.NextFunction} next express next function
 * @returns either continues the middleware chain or returns an error in case validation fails
 */
const verifyToken = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return sendResponse(res, 403, false, {
      msg: "Authentication token is missing",
    });
  }

  try {
    const decodedJWT = await verify(token);
    req.user = decodedJWT;
  } catch (error) {
    return sendResponse(res, 401, false, {
      msg: "Authentication token is invalid",
    });
  }
  return next();
};

export { verifyToken };
