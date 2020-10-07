import { pattern, plugin, PluginGroups } from "../alignContent";
import { PluginFunctionReturnType } from "../types";

describe("alignContent", () => {
  it("Should match the correct pattern", () => {
    expect(pattern.exec("content-center")).toBeTruthy();
    expect(pattern.exec("content-start")).toBeTruthy();
    expect(pattern.exec("content-end")).toBeTruthy();
    expect(pattern.exec("content-between")).toBeTruthy();
    expect(pattern.exec("content-around")).toBeTruthy();
    expect(pattern.exec("content-stretch")).toBeTruthy();

    expect(pattern.exec("unknown")).toBeFalsy();
    expect(pattern.exec("content-unknown")).toBeFalsy();
  });

  it.each<[input: string, expected: PluginFunctionReturnType]>([
    ["content-center", { alignContent: "center" }],
    ["content-start", { alignContent: "flex-start" }],
    ["content-end", { alignContent: "flex-end" }],
    ["content-stretch", { alignContent: "stretch" }],
    ["content-between", { alignContent: "space-between" }],
    ["content-around", { alignContent: "space-around" }],
  ])("Should parse %s style correctly", (input, expected) => {
    const theme = jest.fn();
    const groups = (pattern as RegExp).exec(input)!.groups! as PluginGroups;
    const result = plugin({ input, groups, theme });

    expect(result).toEqual(expected);
  });
});
