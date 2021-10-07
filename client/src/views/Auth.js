import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import qs from "qs";

//API
import { getAuthToken } from "../services/gitHubService";

const Auth = () => {
  const location = useLocation();
  const { code } = qs.parse(location.search, { ignoreQueryPrefix: true });

  useEffect(() => {
    const fetchData = async () => {
      await getAuthToken(code);
    };

    fetchData();
  }, []);

  return <div>...Loading</div>;
};

export default Auth;
