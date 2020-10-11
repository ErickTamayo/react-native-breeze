import { PluginFunction, PluginPattern } from "./types";

export type PluginGroups = {
  key: string;
};

export const pattern: PluginPattern = ({ keys }) => {
  return new RegExp(`^min-w-(?<key>${keys("minWidth")})$`);
};

export const plugin: PluginFunction<PluginGroups> = ({ groups, theme }) => {
  const { key } = groups;
  const value = theme(["minWidth", key]);
  return { minWidth: value };
};
