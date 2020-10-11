import { PluginFunction, PluginPattern } from "./types";

export type PluginGroups = { key: string };

export const pattern: PluginPattern = ({ keys }) => {
  return new RegExp(`^overlay-(?<key>${keys("overlayColor")})$`);
};

export const plugin: PluginFunction<PluginGroups> = ({ groups, color }) => {
  const { key } = groups;
  const value = color("overlayColor", key);
  return { overlayColor: value };
};
