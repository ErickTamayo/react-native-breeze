import { PluginFunction } from "./types";

// prettier-ignore
export type PluginGroups = {
  decoration: "no-underline" | "underline" | "line-through" | "underline-double" | "line-through-double" | "underline-dotted" | "line-through-dotted" | "underline-dashed" | "line-through-dashed";
};

export const pattern = /^(?<decoration>no-underline|underline|line-through|underline-double|line-through-double|underline-dotted|line-through-dotted|underline-dashed|line-through-dashed)$/;

export const plugin: PluginFunction<PluginGroups> = ({ groups }) => {
  const { decoration } = groups;

  switch (decoration) {
    case "no-underline":
      return { textDecorationLine: "none" };
    case "underline":
      return { textDecorationLine: "underline", textDecorationStyle: "solid" };
    case "underline-double":
      return { textDecorationLine: "underline", textDecorationStyle: "double" };
    case "underline-dotted":
      return { textDecorationLine: "underline", textDecorationStyle: "dotted" };
    case "underline-dashed":
      return { textDecorationLine: "underline", textDecorationStyle: "dashed" };
    case "line-through":
      return {
        textDecorationLine: "line-through",
        textDecorationStyle: "solid",
      };
    case "line-through-double":
      return {
        textDecorationLine: "line-through",
        textDecorationStyle: "double",
      };
    case "line-through-dotted":
      return {
        textDecorationLine: "line-through",
        textDecorationStyle: "dotted",
      };
    case "line-through-dashed":
      return {
        textDecorationLine: "line-through",
        textDecorationStyle: "dashed",
      };
  }
};
