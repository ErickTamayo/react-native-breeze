import { PluginFunction, PluginPattern } from "./types";

export type PluginGroups = {
  key: string;
};

export const pattern: PluginPattern = ({ keys }) => {
  return new RegExp(`^shadow-?(?<key>${keys("shadow")})?$`);
};

export const plugin: PluginFunction<PluginGroups> = ({ groups, theme }) => {
  const { key } = groups;
  const value = theme(["shadow", key ?? "default"]);
  return value;
};
