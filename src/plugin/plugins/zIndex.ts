import { withNegativePrefix } from "../utils/misc";
import { validate } from "../utils/validation";
import { PluginFunction } from "./types";

export type PluginGroups = { prefix?: "-"; key: string };

export const pattern = /^(?<prefix>-)?z-(?<key>[\d\w-]+)$/;

export const plugin: PluginFunction<PluginGroups> = ({
  input,
  groups,
  theme,
}) => {
  const { prefix, key } = groups;
  const value = theme<number>(["zIndex", withNegativePrefix(prefix, key)]);

  if (!validate(input, value, ["number"])) return {};

  return { zIndex: value };
};
