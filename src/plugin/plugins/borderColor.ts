import { PluginFunction, PluginPattern } from "./types";

export type PluginGroups = {
  position?: "x" | "y" | "t" | "b" | "l" | "r" | "e" | "s";
  key: string;
};

export const pattern: PluginPattern = ({ keys }) => {
  // prettier-ignore
  return new RegExp(`^border-((?<position>x|y|t|b|l|r|e|s)-)?(?<key>${keys("borderColor")})$`);
};

export const plugin: PluginFunction<PluginGroups> = ({ groups, color }) => {
  const { position, key } = groups;
  const value = color("borderColor", key);
  switch (position) {
    case "x":
      return { borderLeftColor: value, borderRightColor: value };
    case "y":
      return { borderTopColor: value, borderBottomColor: value };
    case "t":
      return { borderTopColor: value };
    case "b":
      return { borderBottomColor: value };
    case "l":
      return { borderLeftColor: value };
    case "r":
      return { borderRightColor: value };
    case "e":
      return { borderEndColor: value };
    case "s":
      return { borderStartColor: value };
    default:
      return { borderColor: value };
  }
};
