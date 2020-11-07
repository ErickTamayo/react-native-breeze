import { PluginFunction, PluginPattern } from "./types";

export type PluginGroups = { key: string };

export const pattern: PluginPattern = ({ colorKeys }) => {
  return new RegExp(`^bg-(?<key>${colorKeys("backgroundColor")})$`);
};

export const plugin: PluginFunction<PluginGroups> = ({ groups, color }) => {
  const { key } = groups;
  const value = color("backgroundColor", key);
  return { backgroundColor: value };
};
