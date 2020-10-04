import { colorToKey } from "../utils/misc";
import { validate } from "../utils/validation";
import { PluginFunction } from "./types";

export type PluginGroups = { color: string };

export const pattern = /^bg-(?<color>[\w\d-]+)$/;

export const plugin: PluginFunction<PluginGroups> = ({
  input,
  groups,
  theme,
}) => {
  const { color } = groups;
  const value = theme(colorToKey(color));

  if (!validate(input, value, ["string"])) return {};

  return { backgroundColor: value };
};
