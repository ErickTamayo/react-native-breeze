import { validate } from "../utils/validation";
import { PluginFunction, PluginPattern } from "./types";

export type PluginGroups = {
  key: string;
};

export const pattern: PluginPattern = ({ keys }) => {
  const flexKeys = keys("flex", "|");
  return new RegExp(`^flex-(?<key>${flexKeys})$`);
};

export const plugin: PluginFunction<PluginGroups> = ({
  input,
  groups,
  theme,
}) => {
  const { key } = groups;
  const value = theme<number>(["flex", key]);

  if (!validate(input, value, ["number"])) return {};

  return { flex: value };
};
