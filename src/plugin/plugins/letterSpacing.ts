import { validate } from "../utils/validation";
import { PluginFunction, PluginPattern } from "./types";

export type PluginGroups = {
  key: string;
};

export const pattern: PluginPattern = ({ keys }) => {
  const spacingKeys = keys("letterSpacing", "|");
  return new RegExp(`^tracking-(?<key>${spacingKeys})$`);
};

export const plugin: PluginFunction<PluginGroups> = ({
  input,
  groups,
  theme,
}) => {
  const { key } = groups;
  const value = theme<number>(["letterSpacing", key]);

  if (!validate(input, value, ["number"])) return {};

  return { letterSpacing: value };
};
