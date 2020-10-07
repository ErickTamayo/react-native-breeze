import { pattern, plugin, PluginGroups } from "../overflow";
import { PluginFunctionReturnType } from "../types";

describe("overflow", () => {
  it("Should match the correct pattern", () => {
    expect(pattern.exec("overflow-hidden")).toBeTruthy();
    expect(pattern.exec("overflow-visible")).toBeTruthy();
    expect(pattern.exec("overflow-scroll")).toBeTruthy();

    expect(pattern.exec("overflow-unknown")).toBeFalsy();
    expect(pattern.exec("overflow")).toBeFalsy();
  });

  it.each<[input: string, expected: PluginFunctionReturnType]>([
    ["overflow-hidden", { overflow: "hidden" }],
    ["overflow-visible", { overflow: "visible" }],
    ["overflow-scroll", { overflow: "scroll" }],
  ])("Should parse %s style correctly", (input, expected) => {
    const theme = jest.fn();
    const groups = (pattern as RegExp).exec(input)!.groups! as PluginGroups;
    const result = plugin({ input, groups, theme });

    expect(result).toEqual(expected);
  });
});
