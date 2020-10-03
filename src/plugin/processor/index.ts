import path from "path";
import template from "@babel/template";
import { resolve } from "../resolvers";

export const processStyles = (path: any, styles: string[]) => {
  const style = styles.reduce((acc, s) => {
    return { ...acc, ...resolve(s) };
  }, {});

  const code = JSON.stringify(style).replace(/\"([^(\")"]+)\":/g, "$1:");
  path.replaceWith(template.expression(code)());
};
