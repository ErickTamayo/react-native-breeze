import { PluginPattern, PluginFunction } from "../plugins/types";
import Config from "./config";

const { theme, keys, color, colorKeys } = Config;

export type shouldEvaluateTheCorrectPatternTestCases = {
  shouldMatch: string[];
  shouldNotMatch: string[];
};

export const shouldEvaluateTheCorrectPatternTest = (
  pattern: PluginPattern,
  { shouldMatch, shouldNotMatch }: shouldEvaluateTheCorrectPatternTestCases
) =>
  describe("Should match the correct pattern", () => {
    const regex =
      typeof pattern === "function" ? pattern({ keys, colorKeys }) : pattern;

    it.each(shouldMatch)("should match %s", (input) => {
      expect(regex.exec(input)).toBeTruthy();
    });

    it.each(shouldNotMatch)("should not match %s", (input) => {
      expect(regex.exec(input)).toBeFalsy();
    });
  });

export const shouldMatchOutputSnapshot = <T>(
  pattern: PluginPattern,
  plugin: PluginFunction<T>,
  cases: string[]
) =>
  it.each(cases)("Should parse (%s) correctly", (input) => {
    const regex =
      typeof pattern === "function" ? pattern({ keys, colorKeys }) : pattern;
    const groups = regex.exec(input)!.groups! as any;

    // TODO fix typing
    const result = plugin({ input, groups, theme, color } as any);

    expect(result).toMatchSnapshot();
  });

export const generateInput = (
  base: string,
  sides: string[],
  variations: string[] = [""]
) => {
  return sides.reduce<string[]>((acc, side) => {
    return [
      ...acc,
      ...variations.map((size) => {
        if (!size && !side) return base;

        if (size && !side) {
          return `${base}-${size}`;
        }

        if (!size && side) {
          return `${base}-${side}`;
        }

        return `${base}-${side}-${size}`;
      }),
    ];
  }, []);
};
