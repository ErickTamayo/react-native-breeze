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
  radius?: string;
};

export const pattern: PluginPattern = ({ keys }) => {
  // prettier-ignore
  return new RegExp(`^rounded-?(?<position>t|r|b|l|s|e|tl|tr|ts|te|br|bl|bs|be)?-?(?<radius>${keys("borderRadius")})?$`);
};

export const plugin: PluginFunction<PluginGroups> = ({
  input,
  groups,
  theme,
}) => {
  const { position, radius } = groups;
  const value = theme<number>(["borderRadius", radius || "default"]);

  if (!validate(input, value, ["number"])) return {};

  switch (position) {
    case "t":
      return { borderTopRadius: value };
    case "r":
      return { borderRightRadius: value };
    case "b":
      return { borderBottomRadius: value };
    case "l":
      return { borderLeftRadius: value };
    case "s":
      return { borderStartRadius: value };
    case "e":
      return { borderEndRadius: value };
    case "tl":
      return { borderTopLeftRadius: value };
    case "tr":
      return { borderTopRightRadius: value };
    case "ts":
      return { borderTopStartRadius: value };
    case "te":
      return { borderTopEndRadius: value };
    case "bl":
      return { borderBottomLeftRadius: value };
    case "br":
      return { borderBottomRightRadius: value };
    case "bs":
      return { borderBottomStartRadius: value };
    case "be":
      return { borderBottomEndRadius: value };
    default:
      return { borderRadius: value };
  }
};
