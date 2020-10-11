import { validate } from "../utils/validation";
import { PluginFunction, PluginPattern } from "./types";

export type PluginGroups = {
  key: string;
};

export const pattern: PluginPattern = ({ keys }) => {
  return new RegExp(`^font-(?<key>${keys("fontWeight")})$`);
};

export const plugin: PluginFunction<PluginGroups> = ({
  input,
  groups,
  theme,
}) => {
  const { key } = groups;

  // prettier-ignore
  const value = theme<
    "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined
  >(["fontWeight", key]);

  // prettier-ignore
  const validTypes = [ "normal", "bold", "100", "200", "300", "400", "500", "600", "700", "800", "900", "undefined", ];

  if (!validate(input, value, validTypes)) return {};

  return { fontWeight: value };
};
