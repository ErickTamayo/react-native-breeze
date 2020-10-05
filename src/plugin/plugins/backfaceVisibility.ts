import { PluginFunction, PluginPattern } from "./types";

export type PluginGroups = { visibility: "visible" | "hidden" };

export const pattern: PluginPattern = /^backface-(?<visibility>visible|hidden)$/;

export const plugin: PluginFunction<PluginGroups> = ({ groups }) => {
  const { visibility } = groups;
  return { backfaceVisibility: visibility };
};
