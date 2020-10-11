import { validate } from "../utils/validation";
import { PluginFunction, PluginPattern } from "./types";

export type PluginGroups = {
  key?: string;
};

export const pattern: PluginPattern = ({ keys }) => {
  return new RegExp(`^elevated-?(?<key>${keys("elevation")})?$`);
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
