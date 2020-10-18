import { PluginFunction } from "./types";

export type PluginGroups = {
  direction: "row" | "row-reverse" | "column" | "column-reverse";
};

export const pattern = /^flex-(?<direction>row|row-reverse|column|column-reverse)$/;

export const plugin: PluginFunction<PluginGroups> = ({ groups }) => {
  const { direction } = groups;
  return { flexDirection: direction };
};
