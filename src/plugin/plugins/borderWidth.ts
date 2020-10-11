import { validate } from "../utils/validation";
import { PluginFunction, PluginPattern } from "./types";

export type PluginGroups = {
  position?:
    | "t"
    | "r"
    | "b"
    | "l"
    | "s"
    | "e"
    | "tl"
    | "tr"
    | "ts"
    | "te"
    | "br"
    | "bl"
    | "bs"
    | "be";
  width?: string;
};

export const pattern: PluginPattern = ({ keys }) => {
  // prettier-ignore
  return new RegExp(`^border-?(?<position>t|r|b|l|s|e|tl|tr|ts|te|br|bl|bs|be)?-?(?<width>${keys("borderWidth")})?$`);
};

export const plugin: PluginFunction<PluginGroups> = ({
  input,
  groups,
  theme,
}) => {
  const { position, width } = groups;
  const value = theme<number>(["borderWidth", width || "default"]);

  if (!validate(input, value, ["number"])) return {};

  switch (position) {
    case "t":
      return { borderTopWidth: value };
    case "r":
      return { borderRightWidth: value };
    case "b":
      return { borderBottomWidth: value };
    case "l":
      return { borderLeftWidth: value };
    case "s":
      return { borderStartWidth: value };
    case "e":
      return { borderEndWidth: value };
    case "tl":
      return { borderTopLeftWidth: value };
    case "tr":
      return { borderTopRightWidth: value };
    case "ts":
      return { borderTopStartWidth: value };
    case "te":
      return { borderTopEndWidth: value };
    case "bl":
      return { borderBottomLeftWidth: value };
    case "br":
      return { borderBottomRightWidth: value };
    case "bs":
      return { borderBottomStartWidth: value };
    case "be":
      return { borderBottomEndWidth: value };
    default:
      return { borderWidth: value };
  }
};
