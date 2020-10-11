import { validate } from "../utils/validation";
import { PluginFunction, PluginPattern } from "./types";

export type PluginGroups = {
  key: string;
};

export const pattern: PluginPattern = ({ keys }) => {
  return new RegExp(`^flex-shrink-?(?<key>${keys("flexShrink")})?$`);
};

export const plugin: PluginFunction<PluginGroups> = ({
  input,
  groups,
  theme,
}) => {
  const { key } = groups;
  const value = theme<number>(["flexShrink", key || "default"]);

  if (!validate(input, value, ["number"])) return {};

  return { flexShrink: value };
};
