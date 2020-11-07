import { PluginFunction, PluginPattern } from "./types";

export type PluginGroups = {
  key: string;
};

export const pattern: PluginPattern = ({ keys }) => {
  return new RegExp(`^max-w-(?<key>${keys("maxWidth")})$`);
};

export const plugin: PluginFunction<PluginGroups> = ({ groups, theme }) => {
  const { key } = groups;
  const value = theme(["maxWidth", key]);
  return { maxWidth: value };
};
