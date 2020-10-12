import tinycolor from "tinycolor2";

export const withNegativePrefix = (
  negative: string | undefined,
  key: string
) => {
  return `${negative || ""}${key}`;
};

export const negative = (obj: { [key: string]: number }) => {
  return Object.keys(obj).reduce((acc, key) => {
    return { ...acc, [`-${key}`]: obj[key] * -1 };
  }, {});
};

export const opacity = (color: string, alpha: number) => {
  return tinycolor(color).setAlpha(alpha).toRgbString();
};
