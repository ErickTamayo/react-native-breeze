export type PluginFunctionParams = {
  input: string;
  groups: { [group: string]: string };
  theme: (key: string) => any;
};

export type PluginFunction = (params: PluginFunctionParams) => object;
