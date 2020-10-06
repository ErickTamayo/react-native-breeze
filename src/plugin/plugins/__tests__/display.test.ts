import { pattern, plugin, PluginGroups } from "../display";
import { PluginFunctionReturnType } from "../types";

describe("display", () => {
  it("Should match the correct pattern", () => {
    expect((pattern as RegExp).exec("hidden")).toBeTruthy();
    expect((pattern as RegExp).exec("flex")).toBeTruthy();
    expect((pattern as RegExp).exec("other")).toBeFalsy();
  });

  it.each<[input: string, expected: PluginFunctionReturnType]>([
    ["hidden", { display: "none" }],
    ["flex", { display: "flex" }],
  ])("Should parse %s style correctly", (input, expected) => {
    const theme = jest.fn();
    const groups = (pattern as RegExp).exec(input)!.groups! as PluginGroups;

    const result = plugin({ input, groups, theme });

    expect(result).toEqual(expected);
  });
});
