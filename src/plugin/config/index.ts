import fs from "fs";
import path from "path";
import get from "lodash.get";
import { negative, opacity } from "../utils/misc";
import { flattenObject } from "../utils/objects";

import baseConfig from "./breeze.config.base";

const userConfig = (() => {
  const userConfigPath = path.resolve(process.cwd(), "breeze.config.js");
  const userConfigExists = fs.existsSync(userConfigPath);

  if (!userConfigExists) return require("./breeze.config");

  return require(userConfigPath);
})();

type Path = Parameters<typeof get>[1];

export const config = (path: Path, defaultValue?: any) => {
  const userConfigValue = get(userConfig, path);

  if (userConfigValue) return userConfigValue;

  const baseConfigValue = get(baseConfig, path, defaultValue);

  return baseConfigValue;
};

const evaluateThemeObjectOrFunction = (objectOrFunction: any) => {
  if (typeof objectOrFunction !== "function") {
    return objectOrFunction;
  }
  return objectOrFunction(theme, { negative, opacity });
};

export const theme = (path: Path, defaultValue?: any) => {
  const root = Array.isArray(path) ? path[0] : (path as string).split(".")[0];

  if (!root) throw new Error("Invalid path for theme");

  const extended = evaluateThemeObjectOrFunction(
    config(["theme.extend", root])
  );

  if (extended) {
    return get({ [root]: extended }, path, defaultValue);
  }

  const overwritten = evaluateThemeObjectOrFunction(config(["theme", root]));

  return get({ [root]: overwritten }, path, defaultValue);
};

export const keys = (path: Path) => {
  return Object.keys(theme(path, {}))
    .filter((key) => key !== "default")
    .map((key) => (key.startsWith("-") ? key.slice(1) : key))
    .join("|");
};

export const colorKeys = (path: Path) => {
  const flattened = flattenObject(theme(path, {}));
  return Object.keys(flattened).join("|");
};

export const color = (path: Path, color: string): string => {
  const flattened = flattenObject(theme(path, {}));
  return flattened[color];
};
