import memoize from "fast-memoize";
import { backgroudColorResolver } from "./backgroundColor";
import { createThemeFunction } from "../utils/theme";

const coreResolvers = [backgroudColorResolver];

const findResolver = (input: string) => {
  let groups: { [group: string]: string } = {};

  const resolver = coreResolvers.find((resolver) => {
    const { pattern } = resolver;
    const result = pattern.exec(input);

    if (result) {
      groups = result.groups || {};
      return true;
    }

    return false;
  });

  if (resolver) {
    return { resolver, groups };
  }

  return undefined;
};

// KEEP AN EYE ON THIS
export const resolve = memoize(
  (input: string, baseConfig: any, userConfig: any) => {
    const found = findResolver(input);

    if (!found) {
      console.warn(`Could not resolve ${input} style name.`);
      return {};
    }

    const { resolver, groups } = found;

    const theme = createThemeFunction(baseConfig, userConfig);

    return resolver.fn({ input, groups, theme });
  }
);
