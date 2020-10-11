import { withNegativePrefix } from "../utils/misc";
import { validate } from "../utils/validation";
import { PluginFunction, PluginPattern } from "./types";
export type PluginGroups = {
  prefix?: "-";
  position:
    | "inset"
    | "inset-x"
    | "inset-y"
    | "top"
    | "right"
    | "bottom"
    | "left"
    | "start"
    | "end";
  key: string;
};

export const pattern: PluginPattern = ({ keys }) => {
  // prettier-ignore
  const positions = ["inset", "inset-x", "inset-y", "top", "right", "bottom", "left", "start", "end"].join('|');
  // prettier-ignore
  return new RegExp(`^(?<prefix>-)?(?<position>${positions})-(?<key>${keys("inset")})$`);
};

export const plugin: PluginFunction<PluginGroups> = ({
  input,
  groups,
  theme,
}) => {
  const { prefix, position, key } = groups;

  const value = theme<number | string>([
    "inset",
    withNegativePrefix(prefix, key),
  ]);

  if (!validate(input, value, ["number"])) return {};

  switch (position) {
    case "inset-x":
      return { right: value, left: value };
    case "inset-y":
      return { top: value, bottom: value };
    case "top":
      return { top: value };
    case "bottom":
      return { bottom: value };
    case "left":
      return { left: value };
    case "right":
      return { right: value };
    case "start":
      return { start: value };
    case "end":
      return { end: value };
    default:
      return { top: value, right: value, bottom: value, left: value };
  }
};
