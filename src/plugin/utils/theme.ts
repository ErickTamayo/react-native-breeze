import { tsObjectKeyword } from "@babel/types";
import memoize from "fast-memoize";
import merge from "deepmerge";
import path from "path";
import baseConfig from "../config/breeze.config.base.js";

let userConfig: any = undefined;

// try {
//   userConfig = require(path.resolve(process.cwd(), "breeze.config.js"));
// } catch (error) {}

export const createThemeFunction = () => {
  try {
    userConfig = require(path.resolve(process.cwd(), "breeze.config.js"));
  } catch (error) {}

  const { theme: baseTheme } = baseConfig;
  const { theme: userTheme } = userConfig || { theme: { extend: {} } };
  const { extend: extendedTheme } = userTheme;

  const extended = merge(
    {
      ...baseTheme,
      ...userTheme,
    },
    extendedTheme
  ) as any;

  const theme = (key: string) => {
    if (extended[key]) {
      const found = extended[key];
      return typeof found === "function" ? found(theme) : found;
    }
  };

  return theme;
};
