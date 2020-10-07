import { validate } from "../utils/validation";
import { PluginFunction, PluginPattern } from "./types";

export type PluginGroups = {
  key: string;
};

export const pattern: PluginPattern = ({ theme }) => {
  const sizes = Object.keys(theme("fontSize")).join("|");
  return new RegExp(`^text-(?<key>${sizes})$`);
};

export const plugin: PluginFunction<PluginGroups> = ({
  input,
  groups,
  theme,
}) => {
  const { key } = groups;
  const value = theme<number>(["fontSize", key]);

  if (!validate(input, value, ["number"])) return {};

  return { fontSize: value };
};
