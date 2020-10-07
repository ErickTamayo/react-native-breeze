import { PluginFunction } from "./types";

export type PluginGroups = { style: "italic" | "normal" };

export const pattern = /^(?<style>italic|not-italic)$/;

export const plugin: PluginFunction<PluginGroups> = ({ groups }) => {
  const { style } = groups;
  return { fontStyle: style === "italic" ? "italic" : "normal" };
};
