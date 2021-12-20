import React, { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../components/App";
import { validateToken } from "../utils/api";
import Spinner from "../components/common/Spinner";
import { tokenExpired } from "../redux/actions/authActions";

function withAuth(App) {
  const WrappedApp = ({ tokenHasExpired = false, ...props }) => {
    const { token, clearToken } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const kickUser = () => {
      clearToken();
      navigate("/login");
    };

    useEffect(() => {
      const fireValidateToken = async (token) => {
        const { success: tokenIsValid } = await validateToken({ token });
        if (tokenIsValid) setLoading(false);
        else kickUser();
      };
      if (tokenHasExpired) kickUser();
      else fireValidateToken(token);
    }, [tokenHasExpired]);

    return loading ? <Spinner /> : <App {...props} />;
  };

  function mapStateToProps({ authReducer: { tokenHasExpired } }) {
    return {
      tokenHasExpired,
    };
  }

  const mapDispatchToProps = {
    tokenExpired,
  };

  return connect(mapStateToProps, mapDispatchToProps)(WrappedApp);
}

export default withAuth;
