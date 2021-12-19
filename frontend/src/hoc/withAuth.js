import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../components/App";
import { validateToken } from "../utils/api";
import Spinner from "../components/common/Spinner";

function withAuth(App) {
  const WrappedApp = () => {
    const { token, clearToken } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
      const fireValidateToken = async (token) => {
        const { success: tokenIsValid } = await validateToken({ token });
        if (tokenIsValid) setLoading(false);
        else {
          clearToken();
          navigate("/login");
        }
      };
      fireValidateToken(token);
    }, []);

    return loading ? <Spinner /> : <App />;
  };

  return WrappedApp;
}

export default withAuth;
