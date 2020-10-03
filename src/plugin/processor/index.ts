import path from "path";
import template from "@babel/template";
import { resolve } from "../resolvers";
import baseConfig from "../config/breeze.config.base.js";

let userConfig: any = undefined;

try {
  userConfig = require(path.resolve(process.cwd(), "breeze.config.js"));
} catch (error) {}

export const processStyles = (path: any, styles: string[]) => {
  const style = styles.reduce((acc, s) => {
    return { ...acc, ...resolve(s, baseConfig, userConfig) };
  }, {});

  const code = JSON.stringify(style).replace(/\"([^(\")"]+)\":/g, "$1:");
  path.replaceWith(template.expression(code)());
};
