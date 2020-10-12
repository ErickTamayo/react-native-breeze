import { PluginFunction, PluginPattern } from "./types";

export type PluginGroups = { key: string };

export const pattern: PluginPattern = ({ colorKeys }) => {
  return new RegExp(`^text-(?<key>${colorKeys("textColor")})$`);
};

export const plugin: PluginFunction<PluginGroups> = ({ groups, color }) => {
  const { key } = groups;
  const value = color("textColor", key);
  return { color: value };
};
