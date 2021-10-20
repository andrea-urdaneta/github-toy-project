const { BrowserWindow, ipcMain, shell } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const authService = require("./services/auth-services");

function createAppWindow() {
  let win = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.webContents.openDevTools();

  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../../build/index.html")}`
  );

  win.on("closed", () => {
    win = null;
  });

  ipcMain.on("send-auth-token", (e, args) => {
    const accessToken = authService.getAccessToken();

    win.webContents.send("receive-auth-token", { accessToken });
  });

  ipcMain.on("open-user-profile", (e, args) => {
    console.log(args);
    shell.openExternal(args);
  });
}

module.exports = createAppWindow;
