import { pattern, plugin, PluginGroups } from "../backfaceVisibility";
import { PluginFunctionReturnType } from "../types";

describe("backface", () => {
  it("Should match the correct display pattern", () => {
    expect((pattern as RegExp).exec("backface-hidden")).toBeTruthy();
    expect((pattern as RegExp).exec("backface-visible")).toBeTruthy();
    expect((pattern as RegExp).exec("other")).toBeFalsy();
  });

  it.each<[input: string, expected: PluginFunctionReturnType]>([
    ["backface-hidden", { backfaceVisibility: "hidden" }],
    ["backface-visible", { backfaceVisibility: "visible" }],
  ])("Should parse %s style correctly", (input, expected) => {
    const theme = jest.fn();
    const groups = (pattern as RegExp).exec(input)!.groups! as PluginGroups;

    const result = plugin({ input, groups, theme });

    expect(result).toEqual(expected);
  });
});
