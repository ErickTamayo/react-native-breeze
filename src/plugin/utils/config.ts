import fs from "fs";
import path from "path";
import merge from "deepmerge";
import baseConfig from "../config/breeze.config.base";
import { Configuration } from "../types";

const userConfigPath = path.resolve(process.cwd(), "breeze.config.js");
const userConfigExists = fs.existsSync(userConfigPath);
let userConfig = require("../config/breeze.config");

if (userConfigExists) {
  userConfig = require(userConfigPath);

  fs.watch(userConfigPath, () => {
    console.log("breeze.config.js changed!");
    delete require.cache[require.resolve(userConfigPath)];
  });
}

// Prepare config
let mergedConfig = merge<Configuration>(baseConfig, userConfig);

// Manage theme extension
const { theme: baseTheme } = baseConfig;
const { theme: userTheme } = userConfig;
const { extend: extendedTheme } = userTheme;

mergedConfig.theme = merge(
  { ...baseTheme, ...userTheme },
  extendedTheme
) as any;

export const config = (key: keyof Configuration) => {
  return mergedConfig[key];
};

export const theme = (key: keyof Configuration["theme"]) => {
  return (config("theme") as Configuration["theme"])[key];
};
