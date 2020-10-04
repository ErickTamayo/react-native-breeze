import { pattern, plugin, PluginGroups } from "../display";

describe.only("display", () => {
  it("Should match the correct display pattern", () => {
    expect(pattern.exec("hidden")).toBeTruthy();
    expect(pattern.exec("flex")).toBeTruthy();
    expect(pattern.exec("other")).toBeFalsy();
  });

  it.each<[string, PluginGroups, string]>([
    ["hidden", { display: "hidden" }, "none"],
    ["flex", { display: "flex" }, "flex"],
  ])("Should parse %s style correctly", (input, groups, expected) => {
    const theme = jest.fn();

    const result = plugin({ input, groups, theme });

    expect(result).toEqual({ display: expected });
  });
});
