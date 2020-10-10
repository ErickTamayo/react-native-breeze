import { validate } from "../utils/validation";
import { PluginFunction, PluginPattern } from "./types";

export type PluginGroups = { color: string };

export const pattern: PluginPattern = ({ keys }) => {
  const colorKeys = keys("colors", "|");
  return new RegExp(`^text-(?<color>${colorKeys})$`);
};

export const plugin: PluginFunction<PluginGroups> = ({
  input,
  groups,
  theme,
}) => {
  const { color } = groups;
  const value = theme<string>(["colors", color], undefined, true);

  if (!validate(input, value, ["string"])) return {};

  return { color: value };
};
