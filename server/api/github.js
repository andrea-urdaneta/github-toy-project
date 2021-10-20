const axios = require("axios");

const gitHubInstance = axios.create({
  baseURL: "https://github.com",
});

module.exports = { gitHubInstance };
