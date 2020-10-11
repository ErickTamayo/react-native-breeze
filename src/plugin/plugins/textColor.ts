import { PluginFunction, PluginPattern } from "./types";

export type PluginGroups = { key: string };

export const pattern: PluginPattern = ({ keys }) => {
  return new RegExp(`^text-(?<key>${keys("textColor")})$`);
};

export const plugin: PluginFunction<PluginGroups> = ({
  input,
  groups,
  color,
}) => {
  const { key } = groups;
  const value = color("textColor", key);
  return { color: value };
};
