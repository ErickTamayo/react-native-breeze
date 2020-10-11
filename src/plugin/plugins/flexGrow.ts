import { validate } from "../utils/validation";
import { PluginFunction, PluginPattern } from "./types";

export type PluginGroups = {
  key: string;
};

export const pattern: PluginPattern = ({ keys }) => {
  return new RegExp(`^flex-grow-?(?<key>${keys("flexGrow")})?$`);
};

export const plugin: PluginFunction<PluginGroups> = ({
  input,
  groups,
  theme,
}) => {
  const { key } = groups;
  const value = theme<number>(["flexGrow", key || "default"]);

  if (!validate(input, value, ["number"])) return {};

  return { flexGrow: value };
};
