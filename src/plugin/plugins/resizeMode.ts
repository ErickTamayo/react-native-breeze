import { PluginFunction } from "./types";

export type PluginGroups = {
  mode: "cover" | "contain" | "stretch" | "repeat" | "center";
};

export const pattern = /^resize-(?<mode>cover|contain|stretch|repeat|center)$/;

export const plugin: PluginFunction<PluginGroups> = ({ groups }) => {
  const { mode } = groups;
  return { resizeMode: mode };
};
