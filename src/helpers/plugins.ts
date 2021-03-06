import memoize from "fast-memoize";
import { Configuration } from "../babel-plugin/types";
import { config, theme, keys, color, colorKeys } from "../config";
import { PluginFunction, PluginPattern } from "../plugins/types";
import * as plugins from "../plugins";

const corePluginsConfiguration = config(
  "corePlugins"
) as Configuration["corePlugins"];

const enabledCorePlugins = Object.keys(corePluginsConfiguration).reduce<
  { pattern?: PluginPattern; plugin?: PluginFunction<any> }[]
>((acc, pluginName) => {
  if (corePluginsConfiguration[pluginName]) {
    const plugin = plugins[pluginName as keyof typeof plugins];
    return [...acc, plugin];
  }
  return acc;
}, []);

const findPluginForStylename = memoize((input: string) => {
  let groups: { [group: string]: string } = {};

  const plugin = enabledCorePlugins.find((pluginImport) => {
    const { pattern, plugin } = pluginImport;

    if (!pattern || !plugin) {
      throw new Error("Invalid plugin");
    }

    const result =
      typeof pattern === "function"
        ? pattern({ keys, colorKeys }).exec(input)
        : pattern.exec(input);

    if (result) {
      groups = result.groups || {};
      return true;
    }

    return false;
  });

  if (plugin) {
    return { plugin, groups };
  }

  return undefined;
});

export const getStyleFromString = (input: string) => {
  const found = findPluginForStylename(input);

  if (!found) {
    console.warn(`Could not resolve ${input} style name.`);
    return {};
  }

  const { groups, plugin } = found;

  return plugin.plugin!({ input, groups, theme, color }) || {};
};
