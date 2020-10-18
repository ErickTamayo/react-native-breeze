import { PluginFunction } from "./types";

export type PluginGroups = {
  alignment: "auto" | "left" | "right" | "center" | "justify";
};

export const pattern = /^text-(?<alignment>auto|left|right|center|justify)$/;

export const plugin: PluginFunction<PluginGroups> = ({ groups }) => {
  const { alignment } = groups;
  return { textAlign: alignment };
};
