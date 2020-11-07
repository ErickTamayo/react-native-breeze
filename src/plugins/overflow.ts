import { PluginFunction } from "./types";

export type PluginGroups = { overflow: "hidden" | "visible" | "scroll" };

export const pattern = /^overflow-(?<overflow>hidden|visible|scroll)$/;

export const plugin: PluginFunction<PluginGroups> = ({ groups }) => {
  const { overflow } = groups;
  return { overflow };
};
