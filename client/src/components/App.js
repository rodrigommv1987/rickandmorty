import React, { createContext } from "react";

import PublicApp from "./PublicApp";
import SecuredApp from "./SecuredApp";
import useUser from "../hooks/useUser";

export const UserContext = createContext();

function App() {
  const { token, setToken, clearToken, user, setUser } = useUser();

  return (
    <UserContext.Provider
      value={{ token, setToken, clearToken, user, setUser }}
    >
      {!token ? <PublicApp /> : <SecuredApp />}
    </UserContext.Provider>
  );
}

export default App;
