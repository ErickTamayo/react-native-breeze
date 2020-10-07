import { validate } from "../utils/validation";
import { PluginFunction, PluginPattern } from "./types";

export type PluginGroups = {
  key: string;
};

export const pattern: PluginPattern = ({ theme }) => {
  const opacities = Object.keys(theme("lineHeight")).join("|");
  return new RegExp(`^leading-(?<key>${opacities})$`);
};

export const plugin: PluginFunction<PluginGroups> = ({
  input,
  groups,
  theme,
}) => {
  const { key } = groups;
  const value = theme<number>(["lineHeight", key]);

  if (!validate(input, value, ["number"])) return {};

  return { lineHeight: value };
};