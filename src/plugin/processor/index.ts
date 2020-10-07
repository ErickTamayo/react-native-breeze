import template from "@babel/template";
import { resolve } from "../plugins";
import merge from "deepmerge";

export const processStyles = (path: any, styles: string[]) => {
  const resolvedStyles = styles.map((style) => resolve(style));

  const style = merge.all(resolvedStyles);

  const code = JSON.stringify(style).replace(/\"([^(\")"]+)\":/g, "$1:");
  path.replaceWith(template.expression(code)());
};
