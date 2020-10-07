import { pattern, plugin, PluginGroups } from "../includeFontPadding";
import { PluginFunctionReturnType } from "../types";

describe("includeFontPadding", () => {
  it("Should match the correct pattern", () => {
    expect(pattern.exec("no-font-padding")).toBeTruthy();
    expect(pattern.exec("font-padding")).toBeTruthy();

    expect(pattern.exec("unknown")).toBeFalsy();
  });

  it.each<[input: string, expected: PluginFunctionReturnType]>([
    ["no-font-padding", { includeFontPadding: false }],
    ["font-padding", { includeFontPadding: true }],
  ])("Should parse %s style correctly", (input, expected) => {
    const theme = jest.fn();
    const groups = (pattern as RegExp).exec(input)!.groups! as PluginGroups;
    const result = plugin({ input, groups, theme });

    expect(result).toEqual(expected);
  });
});
