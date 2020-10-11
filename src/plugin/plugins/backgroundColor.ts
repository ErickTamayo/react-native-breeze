import { validate } from "../utils/validation";
import { PluginFunction, PluginPattern } from "./types";

export type PluginGroups = { key: string };

export const pattern: PluginPattern = ({ keys }) => {
  return new RegExp(`^bg-(?<key>${keys("colors")})$`);
};

export const plugin: PluginFunction<PluginGroups> = ({
  input,
  groups,
  color,
}) => {
  const { key } = groups;
  const value = color(key);

  if (!validate(input, value, ["string"])) return {};

  return { backgroundColor: value };
};
