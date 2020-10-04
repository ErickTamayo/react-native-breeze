import Config from "../utils/config";

export type PluginFunctionParams = {
  input: string;
  groups: { [group: string]: string };
  theme: typeof Config.theme;
};

export type PluginFunction = (params: PluginFunctionParams) => object;
