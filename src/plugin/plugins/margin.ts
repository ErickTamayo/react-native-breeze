import { withNegativePrefix } from "../utils/misc";
import { validate } from "../utils/validation";
import { PluginFunction, PluginPattern } from "./types";

export type PluginGroups = {
  prefix?: "-";
  position?: "x" | "y" | "t" | "r" | "b" | "l" | "s" | "e";
  key: string;
};

export const pattern: PluginPattern = ({ keys }) => {
  // prettier-ignore
  return new RegExp(`^(?<prefix>-)?m(?<position>x|y|t|r|b|l|s|e)?-(?<key>${keys("margin")})$`);
};

export const plugin: PluginFunction<PluginGroups> = ({
  input,
  groups,
  theme,
}) => {
  const { prefix, position, key } = groups;
  const value = theme<number>(["margin", withNegativePrefix(prefix, key)]);

  if (!validate(input, value, ["number"])) return {};

  switch (position) {
    case "x":
      return { marginHorizontal: value };
    case "y":
      return { marginVertical: value };
    case "t":
      return { marginTop: value };
    case "r":
      return { marginRight: value };
    case "b":
      return { marginBottom: value };
    case "l":
      return { marginLeft: value };
    case "s":
      return { marginStart: value };
    case "e":
      return { marginEnd: value };
    default:
      return { margin: value };
  }
};
