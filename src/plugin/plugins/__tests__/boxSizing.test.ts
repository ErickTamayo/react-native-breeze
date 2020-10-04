import { pattern, plugin, PluginGroups } from "../boxSizing";

describe.only("boxSizing", () => {
  it("Should match the correct box-sizing pattern", () => {
    expect(pattern.exec("box-border")).toBeTruthy();
    expect(pattern.exec("box-content")).toBeTruthy();
    expect(pattern.exec("box-unknown")).toBeFalsy();
    expect(pattern.exec("box-")).toBeFalsy();
    expect(pattern.exec("box")).toBeFalsy();
  });

  it.each<[string, PluginGroups, string]>([
    ["box-border", { sizing: "border" }, "border-box"],
    ["box-content", { sizing: "content" }, "content-box"],
  ])("Should parse %s style correctly", (input, groups, expected) => {
    const theme = jest.fn();

    const result = plugin({ input, groups, theme });

    expect(result).toEqual({ boxSizing: expected });
  });
});
