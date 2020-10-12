import { PluginFunction, PluginPattern } from "./types";

export type PluginGroups = {
  key: string;
};

export const pattern: PluginPattern = ({ keys }) => {
  return new RegExp(`^aspect-ratio-(?<key>${keys("aspectRatio")})$`);
};

export const plugin: PluginFunction<PluginGroups> = ({ groups, theme }) => {
  const { key } = groups;
  const value = theme(["aspectRatio", key]);
  return { aspectRatio: value };
};
