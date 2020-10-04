import path from "path";
import memoize from "fast-memoize";
import { Configuration } from "../types";
import Config from "../utils/config";
import { PluginFunction } from "./types";

const { config, theme } = Config;

const corePluginsConfiguration = config(
  "corePlugins"
) as Configuration["corePlugins"];

const enabledCorePlugins = Object.keys(corePluginsConfiguration).reduce<
  { pattern?: RegExp; plugin?: PluginFunction }[]
>((acc, pluginName) => {
  if (corePluginsConfiguration[pluginName]) {
    return [...acc, require(path.resolve(__dirname, pluginName))];
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

    const result = pattern.exec(input);

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

// KEEP AN EYE ON THIS
export const resolve = (input: string) => {
  const found = findPluginForStylename(input);

  if (!found) {
    console.warn(`Could not resolve ${input} style name.`);
    return {};
  }

  const { groups, plugin } = found;

  return plugin.plugin!({ input, groups, theme });
};
