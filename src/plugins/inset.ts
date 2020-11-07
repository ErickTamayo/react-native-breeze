import { withNegativePrefix } from "../helpers/misc";
import { PluginFunction, PluginPattern } from "./types";

// prettier-ignore
export type PluginGroups = {
  prefix?: "-";
  position: "inset" | "inset-x" | "inset-y" | "top" | "right" | "bottom" | "left" | "start" | "end";
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
  const value = theme(["inset", withNegativePrefix(prefix, key)]);

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
