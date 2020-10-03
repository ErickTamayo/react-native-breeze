export type ResolverFunctionParams = {
  input: string;
  groups: { [group: string]: string };
  theme: (key: string) => any;
};

export type ResolverFunction = (params: ResolverFunctionParams) => object;

export type Resolver = {
  pattern: RegExp;
  fn: ResolverFunction;
};
