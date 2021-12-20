import { useState } from "react";

import userStorage from "../utils/userStorage";

export default function useUser() {
  const { getToken, getUser } = userStorage;

  const saveToken = (token) => {
    userStorage.saveToken(token);
    setToken(token);
  };

  const saveUser = (user) => {
    userStorage.saveUser(user);
    setUser(user);
  };

  const clearToken = () => {
    userStorage.clearToken();
    setToken("");
    setUser("");
  };

  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());

  return { token, setToken: saveToken, clearToken, user, setUser: saveUser };
}
