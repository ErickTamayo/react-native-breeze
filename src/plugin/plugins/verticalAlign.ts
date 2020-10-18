import { PluginFunction } from "./types";

export type PluginGroups = { alignment: "auto" | "top" | "bottom" | "center" };

export const pattern = /^align-(?<alignment>auto|top|bottom|center)$/;

export const plugin: PluginFunction<PluginGroups> = ({ groups }) => {
  const { alignment } = groups;
  return { textAlignVertical: alignment };
};
