import { PluginFunction } from "./types";

export type PluginGroups = { writing: "auto" | "ltr" | "rtl" };

export const pattern = /^writing-(?<writing>auto|ltr|rtl)$/;

export const plugin: PluginFunction<PluginGroups> = ({ groups }) => {
  const { writing } = groups;
  return { writingDirection: writing };
};
