import { PluginFunction } from "./types";

export type PluginGroups = {
  alignment: "start" | "end" | "center" | "stretch" | "baseline";
};

export const pattern = /^items-(?<alignment>start|end|center|stretch|baseline)$/;

export const plugin: PluginFunction<PluginGroups> = ({ groups }) => {
  const { alignment } = groups;

  switch (alignment) {
    case "center":
      return { alignItems: "center" };
    case "start":
      return { alignItems: "flex-start" };
    case "end":
      return { alignItems: "flex-end" };
    case "stretch":
      return { alignItems: "stretch" };
    case "baseline":
      return { alignItems: "baseline" };
  }
};
