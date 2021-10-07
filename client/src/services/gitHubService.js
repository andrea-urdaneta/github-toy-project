import { gitHubInstance } from "../api/github";

const getAuthToken = async (code) => {
  const response = await gitHubInstance.post(
    "/login/oauth/access_token",
    {},
    {
      params: {
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
        code,
      },
      headers: {
        Accept: "application/json",
      },
    }
  );
  console.log(response);
};

export { getAuthToken };
