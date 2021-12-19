/**
 * utility function for sending a unified format of API responses
 * @param {express.Response} res express response object
 * @param {integer} status http response status value
 * @param {boolean} success wether the request was successfull or not
 * @param {Object} payload any data to send back to the client
 * @returns {express.Response} the express response object
 */
export function sendResponse(res, status, success, payload = []) {
  res.status(status);
  return res.json({
    success,
    data: payload,
  });
}
