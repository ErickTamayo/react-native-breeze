import { PluginFunction } from "./types";

export type PluginGroups = {
  position: "absolute" | "relative";
};

export const pattern = /^(?<position>absolute|relative)$/;

export const plugin: PluginFunction<PluginGroups> = ({ groups }) => {
  const { position } = groups;
  return { position };
};
