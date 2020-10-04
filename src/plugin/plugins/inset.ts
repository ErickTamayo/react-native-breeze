import { PluginFunction } from "./types";

export type PluginGroups = {
  negative?: "-";
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
  value: string;
};

export const pattern = /^(?<negative>-)?(?<position>(inset(-[xy])?)|top|right|bottom|left|start|end)?-?(?<value>\d+)$/;

export const plugin: PluginFunction<PluginGroups> = ({
  input,
  groups,
  theme,
}) => {
  const { negative, position, value } = groups;

  const key = `${negative || ""}${value}`;
  const number = theme(["inset", key]);

  if (typeof number !== "number") {
    console.error(`Invalid value [${typeof number}] for ${input}`);
    return {};
  }

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
