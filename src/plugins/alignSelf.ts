import { PluginFunction } from "./types";

export type PluginGroups = {
  alignment: "auto" | "start" | "end" | "center" | "stretch" | "baseline";
};

export const pattern = /^self-(?<alignment>auto|start|end|center|stretch|baseline)$/;

export const plugin: PluginFunction<PluginGroups> = ({ groups }) => {
  const { alignment } = groups;

  switch (alignment) {
    case "auto":
      return { alignSelf: "auto" };
    case "center":
      return { alignSelf: "center" };
    case "start":
      return { alignSelf: "flex-start" };
    case "end":
      return { alignSelf: "flex-end" };
    case "stretch":
      return { alignSelf: "stretch" };
    case "baseline":
      return { alignSelf: "baseline" };
  }
};
