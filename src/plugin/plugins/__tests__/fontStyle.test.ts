import { pattern, plugin, PluginGroups } from "../fontStyle";
import { PluginFunctionReturnType } from "../types";

describe("fontStyle", () => {
  it("Should match the correct pattern", () => {
    expect(pattern.exec("italic")).toBeTruthy();
    expect(pattern.exec("not-italic")).toBeTruthy();

    expect(pattern.exec("unknown")).toBeFalsy();
  });

  it.each<[string, PluginFunctionReturnType]>([
    ["italic", { fontStyle: "italic" }],
    ["not-italic", { fontStyle: "normal" }],
  ])("Should parse %s style correctly", (input, expected) => {
    const theme = jest.fn();
    const groups = (pattern as RegExp).exec(input)!.groups! as PluginGroups;
    const result = plugin({ input, groups, theme });

    expect(result).toEqual(expected);
  });
});
