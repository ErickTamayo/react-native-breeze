import memoize from "fast-memoize";
import { memo } from "react";

export interface ColorObject {
  [key: string]: string | ColorObject;
}

export const flattenColors = memoize(
  (colors: ColorObject, prefix: string = ""): { [key: string]: string } => {
    return Object.keys(colors).reduce((acc, color) => {
      const key = prefix ? `${prefix}-${color}` : color;

      if (typeof colors[color] === "object") {
        return { ...acc, ...flattenColors(colors[color] as ColorObject, key) };
      }

      return { ...acc, [key]: colors[color] };
    }, {});
  }
);
