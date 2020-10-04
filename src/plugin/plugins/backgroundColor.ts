import { PluginFunction } from "./types";

export const pattern = /^bg-(?<color>\w+)-?(?<number>\w+)?$/;

export const plugin: PluginFunction = ({ input, groups, theme }) => {
  const { color, number } = groups;

  const path = number ? ["colors", color, number] : ["colors", color];
  const colorString = theme(path);

  if (typeof colorString !== "string") {
    console.error(`Invalid color [${typeof colorString}] for ${input}`);
    return {};
  }

  return { backgroundColor: colorString };
};
