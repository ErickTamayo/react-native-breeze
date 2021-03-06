import get from "lodash.get";
import { negative, opacity } from "../helpers/misc";
import { flattenObject } from "../helpers/objects";
import merge from "deepmerge";

import baseConfig from "./breeze.config.base";

const __BREEZE_USER_CONFIG__ = undefined;

const userConfig = (() => {
  return __BREEZE_USER_CONFIG__ || require("./breeze.config");
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

export const theme = (path: Path, defaultValue?: any): any => {
  const root = Array.isArray(path) ? path[0] : (path as string).split(".")[0];

  if (!root) throw new Error("Invalid path for theme");

  const extended = evaluateThemeObjectOrFunction(
    config(["theme", "extend", root], {})
  );

  const overwritten = evaluateThemeObjectOrFunction(config(["theme", root]));

  const merged = merge(overwritten, extended);

  return get({ [root]: merged }, path, defaultValue);
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
