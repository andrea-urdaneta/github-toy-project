const { gitHubInstance } = require("../api/github");

const getAuthToken = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    res.send({ error: "Code was not received" });
  }

  const response = await gitHubInstance.post(
    "/login/oauth/access_token",
    {},
    {
      params: {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code,
      },
      headers: {
        Accept: "application/json",
      },
    }
  );

  console.log(response.data);

  const access_token = response.data.access_token;

  res.send({ access_token });
};

module.exports = { getAuthToken };
