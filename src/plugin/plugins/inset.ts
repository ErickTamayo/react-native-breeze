import { withNegativePrefix } from "../utils/misc";
import { validate } from "../utils/validation";
import { PluginFunction } from "./types";
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

export const pattern = /^(?<prefix>-)?(?<position>(inset(-[xy])?)|top|right|bottom|left|start|end)-(?<key>[\d\w-]+)$/;

export const plugin: PluginFunction<PluginGroups> = ({
  input,
  groups,
  theme,
}) => {
  const { prefix, position, key } = groups;

  const number = theme(["inset", withNegativePrefix(prefix, key)]);

  if (!validate(input, number, ["number"])) return {};

  if (position === "inset") {
    return { top: number, right: number, bottom: number, left: number };
  }

  if (position === "inset-x") {
    return { right: number, left: number };
  }

  if (position === "inset-y") {
    return { top: number, bottom: number };
  }

  if (position === "top") {
    return { top: number };
  }

  if (position === "right") {
    return { right: number };
  }

  if (position === "bottom") {
    return { bottom: number };
  }

  if (position === "left") {
    return { left: number };
  }

  if (position === "start") {
    return { start: number };
  }

  if (position === "end") {
    return { end: number };
  }

  return {};
};
