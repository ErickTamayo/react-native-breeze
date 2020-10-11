import { withNegativePrefix } from "../utils/misc";
import { PluginFunction, PluginPattern } from "./types";

export type PluginGroups = { prefix?: "-"; key: string };

export const pattern: PluginPattern = ({ keys }) => {
  return new RegExp(`^(?<prefix>-)?z-(?<key>${keys("zIndex")})$`);
};

export const plugin: PluginFunction<PluginGroups> = ({ groups, theme }) => {
  const { prefix, key } = groups;
  const value = theme(["zIndex", withNegativePrefix(prefix, key)]);
  return { zIndex: value };
};
