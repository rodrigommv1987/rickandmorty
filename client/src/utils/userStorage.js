const TOKEN_KEY = "rm-token";
const USER_KEY = "rm-user";

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const getUser = () => {
  return localStorage.getItem(USER_KEY);
};

const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const saveUser = (user) => {
  localStorage.setItem(USER_KEY, user);
};

const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

const userStorage = {
  getToken,
  saveToken,
  clearToken,
  getUser,
  saveUser,
};

export default userStorage;
