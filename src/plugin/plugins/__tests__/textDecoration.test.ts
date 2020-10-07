import { pattern, plugin, PluginGroups } from "../textDecoration";
import { PluginFunctionReturnType } from "../types";

describe("textDecoration", () => {
  it("Should match the correct pattern", () => {
    expect(pattern.exec("no-underline")).toBeTruthy();
    expect(pattern.exec("underline")).toBeTruthy();
    expect(pattern.exec("line-through")).toBeTruthy();
    expect(pattern.exec("underline-double")).toBeTruthy();
    expect(pattern.exec("line-through-double")).toBeTruthy();
    expect(pattern.exec("underline-dotted")).toBeTruthy();
    expect(pattern.exec("line-through-dotted")).toBeTruthy();
    expect(pattern.exec("underline-dashed")).toBeTruthy();
    expect(pattern.exec("line-through-dashed")).toBeTruthy();

    expect(pattern.exec("unknown")).toBeFalsy();
  });

  // prettier-ignore
  it.each<[input: string, expected: PluginFunctionReturnType]>([
    ["no-underline", { textDecorationLine: "none" }],
    ["underline", { textDecorationLine: "underline", textDecorationStyle: "solid" }],
    ["underline-double", { textDecorationLine: "underline", textDecorationStyle: "double" }],
    ["underline-dotted", { textDecorationLine: "underline", textDecorationStyle: "dotted" }],
    ["underline-dashed", { textDecorationLine: "underline", textDecorationStyle: "dashed" }],
    ["line-through", { textDecorationLine: "line-through", textDecorationStyle: "solid" }],
    ["line-through-double", { textDecorationLine: "line-through", textDecorationStyle: "double" }],
    ["line-through-dotted", { textDecorationLine: "line-through", textDecorationStyle: "dotted" }],
    ["line-through-dashed", { textDecorationLine: "line-through", textDecorationStyle: "dashed" }]
  ])("Should parse %s style correctly", (input, expected) => {
    const theme = jest.fn();
    const groups = (pattern as RegExp).exec(input)!.groups! as PluginGroups;
    const result = plugin({ input, groups, theme });

    expect(result).toEqual(expected);
  });
});
