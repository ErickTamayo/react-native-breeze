import { PluginFunction } from "./types";

export type PluginGroups = {
  transform: "uppercase" | "lowercase" | "capitalize" | "normal-case";
};

export const pattern = /^(?<transform>uppercase|lowercase|capitalize|normal-case)$/;

export const plugin: PluginFunction<PluginGroups> = ({ groups }) => {
  const { transform } = groups;
  return { textTransform: transform === "normal-case" ? "none" : transform };
};
