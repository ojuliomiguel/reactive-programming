"use strict";

import { app, protocol, BrowserWindow } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import "./backend";

let win;
const isDevelopment = process.env.NODE_ENV !== "production";

protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
]);

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: "hidden",
    autoHideMenuBar: true,
    icon: "./src/assets/icon.png",
    webPreferences: {
      nodeIntegration: true
    }
  });

  if (process.env.WEBPACK_DEV_SERVER_URL)
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
  else {
    createProtocol("app");
    win.loadURL("app://./index.html");
  }

  win.on("closed", () => {
    win = null;
  });
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (win === null) createWindow();
});

app.on("ready", () => {
  createWindow();
});

if (isDevelopment) {
  if (process.platform === "win32")
    process.on("message", data => {
      if (data === "graceful-exit") app.quit();
    });
  else
    process.on("SIGTERM", () => {
      app.quit();
    });
}
