export function sendResponse(res, status, success, payload = []) {
  res.status(status);
  return res.json({
    success,
    data: payload,
  });
}
