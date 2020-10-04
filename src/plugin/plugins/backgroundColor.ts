import { PluginFunction } from "./types";

export const pattern = /^bg-(?<color>\w+)-?(?<number>\w+)?$/;

export const plugin: PluginFunction = ({ input, groups, theme }) => {
  const { color, number } = groups;

  const colors = theme("colors");
  const colorString = number ? colors[color]?.[number] : colors[color];

  if (typeof colorString !== "string") {
    console.error(`Invalid color [${typeof colorString}] for ${input}`);
    return {};
  }

  return { backgroundColor: colorString };
};
