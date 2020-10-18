import { PluginFunction } from "./types";

export type PluginGroups = { include: "no-font-padding" | "font-padding" };

export const pattern = /^(?<include>no-font-padding|font-padding)$/;

export const plugin: PluginFunction<PluginGroups> = ({ groups }) => {
  const { include } = groups;
  return { includeFontPadding: include === "font-padding" };
};
