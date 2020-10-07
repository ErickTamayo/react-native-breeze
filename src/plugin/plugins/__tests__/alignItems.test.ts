import { pattern, plugin, PluginGroups } from "../alignItems";
import { PluginFunctionReturnType } from "../types";

describe("alignItems", () => {
  it("Should match the correct pattern", () => {
    expect(pattern.exec("items-start")).toBeTruthy();
    expect(pattern.exec("items-end")).toBeTruthy();
    expect(pattern.exec("items-center")).toBeTruthy();
    expect(pattern.exec("items-baseline")).toBeTruthy();
    expect(pattern.exec("items-stretch")).toBeTruthy();

    expect(pattern.exec("unknown")).toBeFalsy();
    expect(pattern.exec("items-unknown")).toBeFalsy();
  });

  it.each<[input: string, expected: PluginFunctionReturnType]>([
    ["items-center", { alignItems: "center" }],
    ["items-start", { alignItems: "flex-start" }],
    ["items-end", { alignItems: "flex-end" }],
    ["items-stretch", { alignItems: "stretch" }],
    ["items-baseline", { alignItems: "baseline" }],
  ])("Should parse %s style correctly", (input, expected) => {
    const theme = jest.fn();
    const groups = (pattern as RegExp).exec(input)!.groups! as PluginGroups;
    const result = plugin({ input, groups, theme });

    expect(result).toEqual(expected);
  });
});
