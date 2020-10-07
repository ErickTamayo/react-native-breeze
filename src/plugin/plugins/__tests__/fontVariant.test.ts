import { pattern, plugin, PluginGroups } from "../fontVariant";
import { PluginFunctionReturnType } from "../types";

describe("fontVariant", () => {
  it("Should match the correct pattern", () => {
    expect(pattern.exec("small-caps")).toBeTruthy();
    expect(pattern.exec("oldstyle-nums")).toBeTruthy();
    expect(pattern.exec("lining-nums")).toBeTruthy();
    expect(pattern.exec("tabular-nums")).toBeTruthy();
    expect(pattern.exec("proportional-nums")).toBeTruthy();

    expect(pattern.exec("unknown")).toBeFalsy();
  });

  it.each<[input: string, expected: PluginFunctionReturnType]>([
    ["small-caps", { fontVariant: ["small-caps"] }],
    ["oldstyle-nums", { fontVariant: ["oldstyle-nums"] }],
    ["lining-nums", { fontVariant: ["lining-nums"] }],
    ["tabular-nums", { fontVariant: ["tabular-nums"] }],
    ["proportional-nums", { fontVariant: ["proportional-nums"] }],
  ])("Should parse %s style correctly", (input, expected) => {
    const theme = jest.fn();
    const groups = (pattern as RegExp).exec(input)!.groups! as PluginGroups;
    const result = plugin({ input, groups, theme });

    expect(result).toEqual(expected);
  });
});
