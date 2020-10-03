import { tsObjectKeyword } from "@babel/types";
import memoize from "fast-memoize";
import merge from "deepmerge";

export const createThemeFunction = memoize(
  (baseConfig: any, userConfig: any) => {
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
      // if (extendedTheme[key]) {
      //   const found = extendedTheme[key];
      //   return typeof found === "function" ? found(theme) : found;
      // } else if (userTheme[key]) {
      //   const found = userTheme[key];
      //   return typeof found === "function" ? found(theme) : found;
      // } else if (baseTheme[key]) {
      //   const found = baseTheme[key];
      //   return typeof found === "function" ? found(theme) : found;
      // }
    };

    return theme;
  }
);

// const theme = (key: string) => {
//   const found = baseConfig["theme"][key];
//   if (!found) return undefined;
//   return typeof found === "function" ? found(theme) : found;
// };
