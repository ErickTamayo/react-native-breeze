import { pattern, plugin, PluginGroups } from "../textTransform";
import { PluginFunctionReturnType } from "../types";

describe("textTransform", () => {
  it("Should match the correct pattern", () => {
    expect(pattern.exec("uppercase")).toBeTruthy();
    expect(pattern.exec("lowercase")).toBeTruthy();
    expect(pattern.exec("capitalize")).toBeTruthy();
    expect(pattern.exec("normal-case")).toBeTruthy();

    expect(pattern.exec("unknown")).toBeFalsy();
  });

  it.each<[input: string, expected: PluginFunctionReturnType]>([
    ["uppercase", { textTransform: "uppercase" }],
    ["lowercase", { textTransform: "lowercase" }],
    ["capitalize", { textTransform: "capitalize" }],
    ["normal-case", { textTransform: "none" }],
  ])("Should parse %s style correctly", (input, expected) => {
    const theme = jest.fn();
    const groups = (pattern as RegExp).exec(input)!.groups! as PluginGroups;
    const result = plugin({ input, groups, theme });

    expect(result).toEqual(expected);
  });
});
