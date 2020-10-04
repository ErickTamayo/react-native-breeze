import { PluginFunction } from "./types";

export type PluginGroups = { display: "hidden" | "flex" };

export const pattern = /^(?<display>hidden|flex)$/;

export const plugin: PluginFunction<PluginGroups> = ({ groups }) => {
  const { display } = groups;
  return { display: display === "hidden" ? "none" : "flex" };
};
