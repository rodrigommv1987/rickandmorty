import { delay } from "../utils/delay";

/**
 * delayes execution of all requests to the server in 1 second.
 * this is just to be able to see the loading spinners in the client app.
 * @param {express.Request} req express request object
 * @param {express.Response} res express response object
 * @param {express.NextFunction} next express next function
 * @returns either continues the middleware chain or returns an error in case validation fails
 */
const delayNetworkRequest = async (req, res, next) => {
  await delay();
  return next();
};

export { delayNetworkRequest };
