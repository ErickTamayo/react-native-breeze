import { PluginFunction, PluginPattern } from "./types";

export type PluginGroups = {
  key?: string;
};

export const pattern: PluginPattern = ({ keys }) => {
  return new RegExp(`^elevated-?(?<key>${keys("elevation")})?$`);
};

export const plugin: PluginFunction<PluginGroups> = ({ groups, theme }) => {
  const { key } = groups;
  const value = theme(["elevation", key || "default"]);
  return { elevation: value };
};
