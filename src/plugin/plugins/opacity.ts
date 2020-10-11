import { validate } from "../utils/validation";
import { PluginFunction, PluginPattern } from "./types";

export type PluginGroups = {
  key: string;
};

export const pattern: PluginPattern = ({ keys }) => {
  return new RegExp(`^opacity-(?<key>${keys("opacity")})$`);
};

export const plugin: PluginFunction<PluginGroups> = ({
  input,
  groups,
  theme,
}) => {
  const { key } = groups;
  const value = theme<number>(["opacity", key]);

  if (!validate(input, value, ["number"])) return {};

  return { opacity: value };
};
