import { pattern, plugin, PluginGroups } from "../writingDirection";
import { PluginFunctionReturnType } from "../types";

describe("writingDirection", () => {
  it("Should match the correct pattern", () => {
    expect(pattern.exec("writing-auto")).toBeTruthy();
    expect(pattern.exec("writing-ltr")).toBeTruthy();
    expect(pattern.exec("writing-rtl")).toBeTruthy();

    expect(pattern.exec("writing")).toBeFalsy();
    expect(pattern.exec("unknown")).toBeFalsy();
  });

  it.each<[input: string, expected: PluginFunctionReturnType]>([
    ["writing-auto", { writingDirection: "auto" }],
    ["writing-ltr", { writingDirection: "ltr" }],
    ["writing-rtl", { writingDirection: "rtl" }],
  ])("Should parse %s style correctly", (input, expected) => {
    const theme = jest.fn();
    const groups = (pattern as RegExp).exec(input)!.groups! as PluginGroups;
    const result = plugin({ input, groups, theme });

    expect(result).toEqual(expected);
  });
});
