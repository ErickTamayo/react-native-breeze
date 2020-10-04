import { pattern, plugin, PluginGroups } from "../inset";

describe.only("boxSizing", () => {
  it("Should match the correct inset pattern", () => {
    expect(pattern.exec("inset-0")).toBeTruthy();
    expect(pattern.exec("inset-99")).toBeTruthy();
    expect(pattern.exec("-inset-99")).toBeTruthy();
    expect(pattern.exec("inset-y-0")).toBeTruthy();
    expect(pattern.exec("inset-x-0")).toBeTruthy();
    expect(pattern.exec("top-0")).toBeTruthy();
    expect(pattern.exec("right-0")).toBeTruthy();
    expect(pattern.exec("bottom-0")).toBeTruthy();
    expect(pattern.exec("left-0")).toBeTruthy();
    expect(pattern.exec("start-0")).toBeTruthy();
    expect(pattern.exec("end-0")).toBeTruthy();
    expect(pattern.exec("-end-0")).toBeTruthy();
    expect(pattern.exec("top-y-2")).toBeFalsy();
    expect(pattern.exec("inset-y-y")).toBeFalsy();
    expect(pattern.exec("inset-top-0")).toBeFalsy();
    expect(pattern.exec("top-top")).toBeFalsy();
    expect(pattern.exec("-end")).toBeFalsy();
    expect(pattern.exec("top")).toBeFalsy();
    expect(pattern.exec("bottom")).toBeFalsy();
  });

  // negative?: "-";
  // position: "inset" | "top" | "right" | "bottom" | "left" | "start" | "end";
  // axis?: "x" | "y";
  // value: string;

  // prettier-ignore
  it.only.each<[string, number, string[], any]>([
    ["inset-0", 0, ["inset", "0"], { top: 0, right: 0, bottom: 0, left: 0 }],
    [ "-inset-2", -2, ["inset", "-2"], { top: -2, right: -2, bottom: -2, left: -2 }, ],
    ["inset-y-3", 3, ["inset", "3"], { top: 3, bottom: 3 }],
    ["-inset-y-3", -3, ["inset", "-3"], { top: -3, bottom: -3 }],
    ["inset-x-4", 4, ["inset", "4"], { left: 4, right: 4 }],
    ["-inset-x-4", -4, ["inset", "-4"], { left: -4, right: -4 }],
    ["top-5", 5, ["inset", "5"], { top: 5 }],
    ["-top-5", -5, ["inset", "-5"], { top: -5 }],
    ["right-5", 5, ["inset", "5"], { right: 5 }],
    ["-right-5", -5, ["inset", "-5"], { right: -5 }],
    ["bottom-5", 5, ["inset", "5"], { bottom: 5 }],
    ["-bottom-5", -5, ["inset", "-5"], { bottom: -5 }],
    ["left-5", 5, ["inset", "5"], { left: 5 }],
    ["-left-5", -5, ["inset", "-5"], { left: -5 }],
    ["start-5", 5, ["inset", "5"], { start: 5 }],
    ["-start-5", -5, ["inset", "-5"], { start: -5 }],
    ["end-5", 5, ["inset", "5"], { end: 5 }],
    ["-end-5", -5, ["inset", "-5"], { end: -5 }],
  ])(
    "Should parse %s style correctly",
    (input, themeReturnValue, themeArgs, expected) => {
      const theme = jest.fn().mockImplementation(() => {
        return themeReturnValue;
      });

      const groups = pattern.exec(input)!.groups! as PluginGroups;

      const result = plugin({ input, groups, theme });

      expect(result).toEqual(expected);
      expect(theme.mock.calls[0][0]).toEqual(themeArgs);
    }
  );
});
