import { Resolver, ResolverFunction } from "./types";

export const fn: ResolverFunction = ({ input, groups, theme }) => {
  const { color, number } = groups;

  const colors = theme("colors");
  const colorString = number ? colors[color]?.[number] : colors[color];

  if (typeof colorString !== "string") {
    throw new Error(
      `Invalid color property [${typeof colorString}] for ${input}`
    );
  }

  return { backgroundColor: colorString };
};

export const backgroudColorResolver: Resolver = {
  pattern: /^bg-(?<color>\w+)-?(?<number>\w+)?$/,
  fn,
};
