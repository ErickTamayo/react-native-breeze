import { PluginFunction } from "./types";

// prettier-ignore
export type PluginGroups = {
  variant: "small-caps" | "oldstyle-nums" | "lining-nums" | "tabular-nums" | "proportional-nums";
};

export const pattern = /^(?<variant>small-caps|oldstyle-nums|lining-nums|tabular-nums|proportional-nums)$/;

export const plugin: PluginFunction<PluginGroups> = ({ groups }) => {
  const { variant } = groups;
  return { fontVariant: [variant] };
};
