import { validEmail } from "../utils/validation";

/**
 * validates that the request has both email
 * and password parameters and the email address is valid
 * @param {express.Request} req express request object
 * @param {express.Response} res express response object
 * @param {express.NextFunction} next express next function
 * @returns either continues the middleware chain or returns an error in case validation fails
 */
const userInputValidation = (req, res, next) => {
  const { email = "", password = "" } = req.body;

  if (!email || !password) {
    res.status(400);
    return res.json({
      success: false,
      msg: "All inputs are required",
    });
  }
  if (!validEmail(email)) {
    res.status(400);
    return res.json({
      success: false,
      msg: "Invalid email address",
    });
  }

  return next();
};

export { userInputValidation };
