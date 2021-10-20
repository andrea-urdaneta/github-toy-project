const { ipcMain } = require("electron");
const axios = require("axios");
const keytar = require("keytar");
const os = require("os");
const url = require("url");
const dotevn = require("dotenv");
const envVariables = require("../config.json");

dotevn.config();

const { client_id, client_secret } = envVariables;

const redirectUri = "http://localhost/callback";

const keytarService = "electron-openid-oauth";
const keytarAccount = os.userInfo().username;

let accessToken = null;

function getAccessToken() {
  return accessToken;
}

function getAuthenticationURL() {
  return `http://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirectUri}&scope=user%20read:user%20user:email%20user:follow`;
}

async function loadTokens(callbackURL) {
  const urlParts = url.parse(callbackURL, true);
  const query = urlParts.query;

  const exchangeOptions = {
    client_id,
    client_secret,
    code: query.code,
    redirect_uri: redirectUri,
  };

  const options = {
    method: "POST",
    url: `https://github.com/login/oauth/access_token`,
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
    },
    data: JSON.stringify(exchangeOptions),
  };

  try {
    const response = await axios(options);

    accessToken = response.data.access_token;
  } catch (error) {
    await logout();

    throw error;
  }
}

async function logout() {
  await keytar.deletePassword(keytarService, keytarAccount);
  accessToken = null;
}

module.exports = {
  getAccessToken,
  getAuthenticationURL,
  loadTokens,
  logout,
};
