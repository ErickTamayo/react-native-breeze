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

export const pattern: PluginPattern = ({ theme }) => {
  const keys = (Object.keys(theme("inset")) || [])
    .map((key) => {
      return key.startsWith("-") ? key.slice(1) : key;
    })
    .join("|");
  // prettier-ignore
  const positions = ["inset", "inset-x", "inset-y", "top", "right", "bottom", "left", "start", "end"].join('|');
  // prettier-ignore
  return new RegExp(`^(?<prefix>-)?(?<position>${positions})-(?<key>${keys})$`);
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

  if (position === "inset") {
    return { top: value, right: value, bottom: value, left: value };
  }

  if (position === "inset-x") {
    return { right: value, left: value };
  }

  if (position === "inset-y") {
    return { top: value, bottom: value };
  }

  if (position === "top") {
    return { top: value };
  }

  if (position === "right") {
    return { right: value };
  }

  if (position === "bottom") {
    return { bottom: value };
  }

  if (position === "left") {
    return { left: value };
  }

  if (position === "start") {
    return { start: value };
  }

  if (position === "end") {
    return { end: value };
  }

  return {};
};
