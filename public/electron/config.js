const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  sources: {
    repoUrl: "https://github.com/andrea-urdaneta/github-toy-project",
  },
  oauth: {
    clientId: process.env.REACT_APP_CLIENT_ID,
    clientSecret: process.env.REACT_APP_CLIENT_SECRET,
    authorizationUrl: "http://github.com/login/oauth/authorize",
    tokenUrl: "https://github.com/login/oauth/access_token",
    useBasicAuthorizationHeader: false,
    // don't touch me
    redirectUri: "http://localhost/callback",
  },
};
