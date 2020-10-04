import { PluginFunction } from "./types";

export type PluginGroups = { color: string; number?: string };

export const pattern = /^bg-(?<color>\w+)-?(?<number>\w+)?$/;

export const plugin: PluginFunction<PluginGroups> = ({
  input,
  groups,
  theme,
}) => {
  const { color, number } = groups;

  const path = number ? ["colors", color, number] : ["colors", color];
  const colorString = theme(path);

  if (typeof colorString !== "string") {
    console.error(`Invalid color [${typeof colorString}] for ${input}`);
    return {};
  }

  return { backgroundColor: colorString };
};
