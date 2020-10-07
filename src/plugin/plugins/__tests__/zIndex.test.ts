import { PluginFunctionReturnType } from "../types";
import { pattern, plugin, PluginGroups } from "../zIndex";

describe("zIndex", () => {
  it("Should match the correct pattern", () => {
    expect(pattern.exec("z-10")).toBeTruthy();
    expect(pattern.exec("-z-10")).toBeTruthy();

    expect(pattern.exec("prefix-z-10")).toBeFalsy();
  });

  // prettier-ignore
  it.each<[input: string, zIndex: number, key: string[], expected: PluginFunctionReturnType]>([
    ["z-10", 10, ["zIndex", "10"], { zIndex: 10 }],
    ["-z-20", -20, ["zIndex", "-20"], { zIndex: -20 }],
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

  it("Should log error if the zIndex value is not valid", () => {
    const theme = jest.fn().mockReturnValue(undefined);
    const input = "z-10";
    const groups = pattern.exec(input)!.groups! as PluginGroups;
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});

    const result = plugin({ input, groups, theme });

    expect(result).toEqual({});
    expect(theme.mock.calls[0][0]).toEqual(["zIndex", "10"]);
    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });
});
