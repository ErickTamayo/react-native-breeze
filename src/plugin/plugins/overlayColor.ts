import { PluginFunction, PluginPattern } from "./types";

export type PluginGroups = { key: string };

export const pattern: PluginPattern = ({ colorKeys }) => {
  return new RegExp(`^overlay-(?<key>${colorKeys("overlayColor")})$`);
};

export const plugin: PluginFunction<PluginGroups> = ({ groups, color }) => {
  const { key } = groups;
  const value = color("overlayColor", key);
  return { overlayColor: value };
};
