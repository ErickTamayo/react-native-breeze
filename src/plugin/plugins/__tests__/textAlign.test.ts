import { pattern, plugin, PluginGroups } from "../textAlign";
import { PluginFunctionReturnType } from "../types";

describe("textAlign", () => {
  it("Should match the correct pattern", () => {
    expect(pattern.exec("text-auto")).toBeTruthy();
    expect(pattern.exec("text-left")).toBeTruthy();
    expect(pattern.exec("text-right")).toBeTruthy();
    expect(pattern.exec("text-center")).toBeTruthy();

    expect(pattern.exec("text-unknown")).toBeFalsy();
  });

  // prettier-ignore
  it.each<[input: string, expected:PluginFunctionReturnType]>([
    ["text-auto", { textAlign: "auto" }],
    ["text-left", { textAlign: "left" }],
    ["text-right", { textAlign: "right" }],
    ["text-center", { textAlign: "center" }],
  ])("Should parse %s style correctly", (input, expected) => {
    const theme = jest.fn();
    const groups = (pattern as RegExp).exec(input)!.groups! as PluginGroups;
    const result = plugin({ input, groups, theme });

    expect(result).toEqual(expected);
  });
});
