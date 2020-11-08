import { PluginFunction, PluginPattern } from "./types";

export type PluginGroups = {
  key?: string;
};

export const pattern: PluginPattern = ({ keys }) => {
  return new RegExp(`^flex-shrink-?(?<key>${keys("flexShrink")})?$`);
};

export const plugin: PluginFunction<PluginGroups> = ({ groups, theme }) => {
  const { key } = groups;
  const value = theme(["flexShrink", key ?? "default"]);
  return { flexShrink: value };
};
