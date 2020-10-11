import { PluginFunction, PluginPattern } from "./types";

export type PluginGroups = {
  position?: "x" | "y" | "t" | "r" | "b" | "l" | "s" | "e";
  key: string;
};

export const pattern: PluginPattern = ({ keys }) => {
  // prettier-ignore
  return new RegExp(`^p(?<position>x|y|t|r|b|l|s|e)?-(?<key>${keys("padding")})$`);
};

export const plugin: PluginFunction<PluginGroups> = ({ groups, theme }) => {
  const { position, key } = groups;
  const value = theme<number>(["padding", key]);

  switch (position) {
    case "x":
      return { paddingHorizontal: value };
    case "y":
      return { paddingVertical: value };
    case "t":
      return { paddingTop: value };
    case "r":
      return { paddingRight: value };
    case "b":
      return { paddingBottom: value };
    case "l":
      return { paddingLeft: value };
    case "s":
      return { paddingStart: value };
    case "e":
      return { paddingEnd: value };
    default:
      return { padding: value };
  }
};
