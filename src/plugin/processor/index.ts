import path from "path";
import template from "@babel/template";
import { resolve } from "../plugins";

export const processStyles = (path: any, styles: string[]) => {
  const style = styles.reduce((acc, style) => {
    return { ...acc, ...resolve(style) };
  }, {});

  const code = JSON.stringify(style).replace(/\"([^(\")"]+)\":/g, "$1:");
  path.replaceWith(template.expression(code)());
};
