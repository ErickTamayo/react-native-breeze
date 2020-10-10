import { validate } from "../utils/validation";
import { PluginFunction, PluginPattern } from "./types";

export type PluginGroups = {
  position?: "x" | "y" | "t" | "b" | "l" | "r" | "e" | "s";
  color: string;
};

export const pattern: PluginPattern = ({ keys }) => {
  const colorKeys = keys("colors", "|");
  // prettier-ignore
  return new RegExp(`^border-((?<position>x|y|t|b|l|r|e|s)-)?(?<color>${colorKeys})$`);
};

export const plugin: PluginFunction<PluginGroups> = ({
  input,
  groups,
  theme,
}) => {
  const { position, color } = groups;
  const value = theme<string>(["colors", color], undefined);

  if (!validate(input, value, ["string"])) return {};

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
