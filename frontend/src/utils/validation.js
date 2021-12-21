/**
 * Validates the provided email address
 * @param {String} email 
 * @returns {Boolean} if the email is valid or not
 */
export function validEmail(email) {
  const validationRegex = /\S+@\S+\.\S+/;
  return validationRegex.test(email.toLowerCase());
}

