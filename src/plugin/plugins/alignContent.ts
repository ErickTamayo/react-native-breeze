import { PluginFunction } from "./types";

export type PluginGroups = {
  alignment: "center" | "start" | "end" | "between" | "around" | "stretch";
};

export const pattern = /^content-(?<alignment>center|start|end|between|around|stretch)$/;

export const plugin: PluginFunction<PluginGroups> = ({ groups }) => {
  const { alignment } = groups;

  switch (alignment) {
    case "center":
      return { alignContent: "center" };
    case "start":
      return { alignContent: "flex-start" };
    case "end":
      return { alignContent: "flex-end" };
    case "stretch":
      return { alignContent: "stretch" };
    case "between":
      return { alignContent: "space-between" };
    case "around":
      return { alignContent: "space-around" };
  }
};
