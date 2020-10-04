import Config from "../utils/config";

export type PluginFunctionParams<T> = {
  input: string;
  groups: T;
  theme: typeof Config.theme;
};

export type PluginFunction<T = {}> = (
  params: PluginFunctionParams<T>
) => object;
