import { PluginFunction, PluginPattern } from "./types";

export type PluginGroups = { style: "solid" | "dotted" | "dashed" };

export const pattern: PluginPattern = /^border-(?<style>solid|dotted|dashed)$/;

export const plugin: PluginFunction<PluginGroups> = ({ groups }) => {
  const { style } = groups;
  return { borderStyle: style };
};
