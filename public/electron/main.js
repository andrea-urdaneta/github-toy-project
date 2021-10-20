const { app, BrowserWindow, ipcMain } = require("electron");
const dotenv = require("dotenv");
const path = require("path");
const isDev = require("electron-is-dev");
const axios = require("axios").default;
const electronOauth2 = require("electron-oauth2");
const oauthConfig = require("./config").oauth;
require("@electron/remote/main").initialize();

const { createAuthWindow } = require("./auth-process");
const createAppWindow = require("./app-process");
const authService = require("./services/auth-services");

dotenv.config();

async function showWindow() {
  createAuthWindow();
  /*  try {
    await authService.refreshTokens();
    return createAppWindow();
  } catch (err) {
    createAuthWindow();
  } */
}

app.on("ready", showWindow);

app.on("window-all-closed", () => {
  app.quit();
});

/* function createAppWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
}

ipcMain.on("open-auth-window", (e, args) => {
  const windowParams = {
    alwaysOnTop: true,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
    },
  };
  console.log(oauthConfig);

  const githubOAuth = electronOauth2(oauthConfig, windowParams);
  githubOAuth
    .getAccessToken({})
    .then((token) => {
      e.sender.send("auth-reply", token);
    })
    .catch((err) => {
      console.log("Error with token:", err);
    });
});

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("active", function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

function createAuthWindow() {
  console.log("test");

  var authWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    "node-integration": false,
  });
  var githubUrl = "https://github.com/login/oauth/authorize?";
  var authUrl = githubUrl + "client_id=" + process.env.REACT_APP_CLIENT_ID;
  authWindow.loadURL(authUrl);
  authWindow.show();

  authWindow.webContents.on("will-navigate", function (event, url) {
    console.log("navigate");
    handleCallback(url, authWindow);
  });

  authWindow.webContents.on(
    "did-get-redirect-request",
    function (event, oldUrl, newUrl) {
      console.log("redirect");
      handleCallback(newUrl, authWindow);
    }
  );

  // Reset the authWindow on close
  authWindow.on(
    "close",
    function () {
      authWindow = null;
    },
    false
  );
}

function handleCallback(url, authWindow) {
  console.log("callback");
  var raw_code = /code=([^&]\*)/.exec(url) || null;
  var code = raw_code && raw_code.length > 1 ? raw_code[1] : null;
  var error = /\?error=(.+)\$/.exec(url);

  if (code || error) {
    // Close the browser if code found or error
    authWindow.destroy();
  }

  if (code) {
    requestGithubToken(code);
  } else if (error) {
    alert(
      "Oops! Something went wrong and we couldn't" +
        "log you in using Github. Please try again."
    );
  }
}

async function requestGithubToken(code) {
  const response = axios.post("https://github.com/login/oauth/access_token", {
    client_id: process.env.REACT_APP_CLIENT_ID,
    client_secret: process.env.REACT_APP_CLIENT_SECRET,
    code,
  });

  console.log(response);
}
 */
