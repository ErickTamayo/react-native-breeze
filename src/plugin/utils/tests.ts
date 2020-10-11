import {
  PatternCallable,
  PluginPattern,
  PluginFunction,
  PluginFunctionReturnType,
} from "../plugins/types";
import Config from "./config";

const { theme, keys, color } = Config;

export type shouldEvaluateTheCorrectPatternTestCases = {
  shouldMatch: string[];
  shouldNotMatch: string[];
};

export const shouldEvaluateTheCorrectPatternTest = (
  pattern: PluginPattern,
  { shouldMatch, shouldNotMatch }: shouldEvaluateTheCorrectPatternTestCases
) =>
  describe("Should match the correct pattern", () => {
    const regex = typeof pattern === "function" ? pattern({ keys }) : pattern;

    it.each(shouldMatch)("should match %s", (input) => {
      expect(regex.exec(input)).toBeTruthy();
    });

    it.each(shouldNotMatch)("should not match %s", (input) => {
      expect(regex.exec(input)).toBeFalsy();
    });
  });

export type ShouldParseCorrectlyTestCase = [
  input: string,
  expected: PluginFunctionReturnType
];

export const shouldParseCorrectlyTest = <T>(
  pattern: PluginPattern,
  plugin: PluginFunction<T>,
  cases: ShouldParseCorrectlyTestCase[]
) =>
  it.each(cases)("Should parse (%s) correctly", (input, expected) => {
    const regex = typeof pattern === "function" ? pattern({ keys }) : pattern;
    const groups = regex.exec(input)!.groups! as any;

    // TODO fix typing
    const result = plugin({ input, groups, theme, color } as any);

    expect(result).toEqual(expected);
  });

export const shouldMatchOutputSnapshot = <T>(
  pattern: PluginPattern,
  plugin: PluginFunction<T>,
  cases: string[]
) =>
  it.each(cases)("Should parse (%s) correctly", (input) => {
    const regex = typeof pattern === "function" ? pattern({ keys }) : pattern;
    const groups = regex.exec(input)!.groups! as any;

    // TODO fix typing
    const result = plugin({ input, groups, theme, color } as any);

    expect(result).toMatchSnapshot();
  });

export type WrongValueTestParams<T> = {
  pattern: PluginPattern;
  plugin: PluginFunction<T>;
  input: string;
  themeReturnType: any;
};

export const wrongValueTest = ({
  pattern,
  plugin,
  input,
  themeReturnType,
}: WrongValueTestParams<any>) =>
  it("Should log error if the value is not valid", () => {
    const theme = jest.fn().mockReturnValue(themeReturnType);
    const color = jest.fn().mockReturnValue(themeReturnType);
    const groups = (pattern as PatternCallable)({ keys: Config.keys }).exec(
      input
    )!.groups! as any;
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});

    // TODO fix typing
    const result = plugin({ input, groups, theme, color } as any);

    expect(result).toEqual({});
    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
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
