import { pattern, plugin, PluginGroups } from "../alignSelf";
import { PluginFunctionReturnType } from "../types";

describe("alignSelf", () => {
  it("Should match the correct pattern", () => {
    expect(pattern.exec("self-auto")).toBeTruthy();
    expect(pattern.exec("self-start")).toBeTruthy();
    expect(pattern.exec("self-end")).toBeTruthy();
    expect(pattern.exec("self-center")).toBeTruthy();
    expect(pattern.exec("self-baseline")).toBeTruthy();
    expect(pattern.exec("self-stretch")).toBeTruthy();

    expect(pattern.exec("unknown")).toBeFalsy();
    expect(pattern.exec("self-unknown")).toBeFalsy();
  });

  it.each<[input: string, expected: PluginFunctionReturnType]>([
    ["self-auto", { alignSelf: "auto" }],
    ["self-center", { alignSelf: "center" }],
    ["self-start", { alignSelf: "flex-start" }],
    ["self-end", { alignSelf: "flex-end" }],
    ["self-stretch", { alignSelf: "stretch" }],
    ["self-baseline", { alignSelf: "baseline" }],
  ])("Should parse %s style correctly", (input, expected) => {
    const theme = jest.fn();
    const groups = (pattern as RegExp).exec(input)!.groups! as PluginGroups;
    const result = plugin({ input, groups, theme });

    expect(result).toEqual(expected);
  });
});
