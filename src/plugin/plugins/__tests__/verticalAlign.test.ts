import { pattern, plugin, PluginGroups } from "../verticalAlign";
import { PluginFunctionReturnType } from "../types";

describe("verticalAlign", () => {
  it("Should match the correct pattern", () => {
    expect(pattern.exec("align-auto")).toBeTruthy();
    expect(pattern.exec("align-top")).toBeTruthy();
    expect(pattern.exec("align-bottom")).toBeTruthy();
    expect(pattern.exec("align-center")).toBeTruthy();

    expect(pattern.exec("align-unknown")).toBeFalsy();
  });

  // prettier-ignore
  it.each<[input: string, expected:PluginFunctionReturnType]>([
    ["align-auto", { textAlignVertical: "auto" }],
    ["align-top", { textAlignVertical: "top" }],
    ["align-bottom", { textAlignVertical: "bottom" }],
    ["align-center", { textAlignVertical: "center" }],
  ])("Should parse %s style correctly", (input, expected) => {
    const theme = jest.fn();
    const groups = (pattern as RegExp).exec(input)!.groups! as PluginGroups;
    const result = plugin({ input, groups, theme });

    expect(result).toEqual(expected);
  });
});
