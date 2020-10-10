import { validate } from "../utils/validation";
import { PluginFunction, PluginPattern } from "./types";

export type PluginGroups = {
  key?: string;
};

export const pattern: PluginPattern = ({ keys }) => {
  const elevationKeys = keys("elevation", "|");
  return new RegExp(`^elevated-?(?<key>${elevationKeys})?$`);
};

export const plugin: PluginFunction<PluginGroups> = ({
  input,
  groups,
  theme,
}) => {
  const { key } = groups;
  const value = theme<number>(["elevation", key || "default"]);

  if (!validate(input, value, ["number"])) return {};

  return { elevation: value };
};
