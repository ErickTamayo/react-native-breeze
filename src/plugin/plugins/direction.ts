import { PluginFunction } from "./types";

export type PluginGroups = { writing: "inherit" | "ltr" | "rtl" };

export const pattern = /^direction-(?<writing>inherit|ltr|rtl)$/;

export const plugin: PluginFunction<PluginGroups> = ({ groups }) => {
  const { writing } = groups;
  return { direction: writing };
};
