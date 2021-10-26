const { app } = require("electron");
const dotenv = require("dotenv");

require("@electron/remote/main").initialize();

const { createAuthWindow } = require("./auth-process");

dotenv.config();

async function showWindow() {
  createAuthWindow();
}

app.on("ready", showWindow);

app.on("window-all-closed", () => {
  app.quit();
});
