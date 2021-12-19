import "dotenv/config.js";
import { verify } from "../utils/jwt";

const verifyToken = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    res.status(403);
    return res.json({
      success: false,
      msg: "Authentication token is missing",
    });
  }

  try {
    const decodedJWT = await verify(token);
    req.user = decodedJWT;
  } catch (error) {
    res.status(401);
    return res.json({
      success: false,
      msg: "Authentication token is invalid",
    });
  }
  return next();
};

export { verifyToken };
