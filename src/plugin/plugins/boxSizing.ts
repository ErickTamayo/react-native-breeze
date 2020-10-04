import { PluginFunction } from "./types";

export type PluginGroups = { sizing: "border" | "content" };

export const pattern = /^box-(?<sizing>border|content)$/;

export const plugin: PluginFunction<PluginGroups> = ({ groups }) => {
  const { sizing } = groups;
  return { boxSizing: `${sizing}-box` };
};
