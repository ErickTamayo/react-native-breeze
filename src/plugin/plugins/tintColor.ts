import { PluginFunction, PluginPattern } from "./types";

export type PluginGroups = { key: string };

export const pattern: PluginPattern = ({ keys }) => {
  return new RegExp(`^tint-(?<key>${keys("tintColor")})$`);
};

export const plugin: PluginFunction<PluginGroups> = ({ groups, color }) => {
  const { key } = groups;
  const value = color("tintColor", key);
  return { tintColor: value };
};
