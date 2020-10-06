import { pattern, plugin, PluginGroups } from "../borderStyle";
import { PluginFunctionReturnType } from "../types";

describe("borderStyle", () => {
  it("Should match the correct pattern", () => {
    expect((pattern as RegExp).exec("border-solid")).toBeTruthy();
    expect((pattern as RegExp).exec("border-dotted")).toBeTruthy();
    expect((pattern as RegExp).exec("border-dashed")).toBeTruthy();
    expect((pattern as RegExp).exec("other")).toBeFalsy();
  });

  it.each<[input: string, expected: PluginFunctionReturnType]>([
    ["border-solid", { borderStyle: "solid" }],
    ["border-dotted", { borderStyle: "dotted" }],
    ["border-dashed", { borderStyle: "dashed" }],
  ])("Should parse %s style correctly", (input, expected) => {
    const theme = jest.fn();
    const groups = (pattern as RegExp).exec(input)!.groups! as PluginGroups;

    const result = plugin({ input, groups, theme });

    expect(result).toEqual(expected);
  });
});
