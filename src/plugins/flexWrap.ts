import { PluginFunction } from "./types";

export type PluginGroups = {
  wrap: "wrap" | "no-wrap" | "wrap-reverse";
};

export const pattern = /^flex-(?<wrap>wrap|no-wrap|wrap-reverse)$/;

export const plugin: PluginFunction<PluginGroups> = ({ groups }) => {
  const { wrap } = groups;
  const flexWrap = wrap === "no-wrap" ? "nowrap" : wrap;
  return { flexWrap };
};
