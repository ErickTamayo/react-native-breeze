import { pattern, plugin, PluginGroups } from "../overflow";

describe("overflow", () => {
  it("Should match the correct pattern", () => {
    expect(pattern.exec("overflow-hidden")).toBeTruthy();
    expect(pattern.exec("overflow-visible")).toBeTruthy();
    expect(pattern.exec("overflow-scroll")).toBeTruthy();
    expect(pattern.exec("overflow-")).toBeFalsy();
    expect(pattern.exec("overflow")).toBeFalsy();
  });

  it.each<[string, PluginGroups, string]>([
    ["hidden", { overflow: "hidden" }, "hidden"],
    ["visible", { overflow: "visible" }, "visible"],
    ["scroll", { overflow: "scroll" }, "scroll"],
  ])("Should parse %s style correctly", (input, groups, expected) => {
    const theme = jest.fn();

    const result = plugin({ input, groups, theme });

    expect(result).toEqual({ overflow: expected });
  });
});
