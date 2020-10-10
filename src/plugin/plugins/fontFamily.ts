import { validate } from "../utils/validation";
import { PluginFunction, PluginPattern } from "./types";

export type PluginGroups = {
  key: string;
};

export const pattern: PluginPattern = ({ keys }) => {
  const fontFamilyKeys = keys("fontFamily", "|");
  return new RegExp(`^font-(?<key>${fontFamilyKeys})$`);
};

export const plugin: PluginFunction<PluginGroups> = ({
  input,
  groups,
  theme,
}) => {
  const { key } = groups;
  const value = theme<string>(["fontFamily", key]);

  if (!validate(input, value, ["string"])) return {};

  return { fontFamily: value };
};
