import { flattenColors } from "../utils/colors";
import { validate } from "../utils/validation";
import { PluginFunction, PluginPattern } from "./types";

export type PluginGroups = { color: string };

export const pattern: PluginPattern = ({ theme }) => {
  const colors = Object.keys(flattenColors(theme("colors")));
  return new RegExp(`^border-(?<color>${colors.join("|")})$`);
};

export const plugin: PluginFunction<PluginGroups> = ({
  input,
  groups,
  theme,
}) => {
  const { color } = groups;
  const colors = flattenColors(theme("colors"));
  const value = colors[color];

  if (!validate(input, value, ["string"])) return {};

  return { borderColor: value };
};
