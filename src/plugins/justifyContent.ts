import { PluginFunction } from "./types";

export type PluginGroups = {
  justify: "start" | "end" | "center" | "between" | "around" | "evenly";
};

export const pattern = /^justify-(?<justify>start|end|center|between|around|evenly)$/;

export const plugin: PluginFunction<PluginGroups> = ({ groups }) => {
  const { justify } = groups;

  switch (justify) {
    case "start":
      return { justifyContent: "flex-start" };
    case "end":
      return { justifyContent: "flex-end" };
    case "center":
      return { justifyContent: "center" };
    case "between":
      return { justifyContent: "space-between" };
    case "around":
      return { justifyContent: "space-around" };
    case "evenly":
      return { justifyContent: "space-evenly" };
  }
};
