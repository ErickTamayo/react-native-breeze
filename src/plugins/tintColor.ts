import { PluginFunction, PluginPattern } from "./types";

export type PluginGroups = { key: string };

export const pattern: PluginPattern = ({ colorKeys }) => {
  return new RegExp(`^tint-(?<key>${colorKeys("tintColor")})$`);
};

export const plugin: PluginFunction<PluginGroups> = ({ groups, color }) => {
  const { key } = groups;
  const value = color("tintColor", key);
  return { tintColor: value };
};
