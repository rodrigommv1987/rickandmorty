/**
 * Utility function to simulate network delay
 * @param {integer} ms time in miliseconds
 * @returns {Promise}
 */
export async function delay(ms = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
