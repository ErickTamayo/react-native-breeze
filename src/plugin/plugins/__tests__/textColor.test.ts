import { ColorObject } from "../../utils/colors";
import { pattern, plugin, PluginGroups } from "../textColor";
import { PatternCallable, PluginFunctionReturnType } from "../types";

describe("textColor", () => {
  it("Should match the correct pattern", () => {
    const theme = jest
      .fn()
      .mockReturnValue({ black: "#000000", green: { 500: "#00ff00" } });
    const callable = pattern as PatternCallable;

    expect(callable({ theme }).exec("text-green-500")).toBeTruthy();
    expect(callable({ theme }).exec("text-black")).toBeTruthy();

    expect(callable({ theme }).exec("text--green-500")).toBeFalsy();
    expect(callable({ theme }).exec("text")).toBeFalsy();
    expect(callable({ theme }).exec("text-")).toBeFalsy();
    expect(callable({ theme }).exec("tezt-green-500")).toBeFalsy();
  });

  // prettier-ignore
  it.each<
    [input: string, colors: ColorObject, expected: PluginFunctionReturnType]
  >([
    ["text-red-500", { red: { 500: "#ff0000" } }, { color: "#ff0000" }],
    ["text-black", { black: "#000000" }, { color: "#000000" }],
  ])(
    "Should parse (%s) correctly",
    (input, themeColorReturnValue, expected) => {
      const theme = jest.fn().mockReturnValue(themeColorReturnValue);
      const callable = pattern as PatternCallable;
      const groups = callable({ theme }).exec(input)!.groups! as PluginGroups;

      const result = plugin({ input, groups, theme });

      expect(result).toEqual(expected);
      expect(theme.mock.calls[0][0]).toEqual("colors");
    }
  );

  it("Should log error if the textColor value is not valid", () => {
    const theme = jest.fn().mockReturnValue({ red: { 500: 0 } });
    const input = "text-red-500";
    const callable = pattern as PatternCallable;
    const groups = callable({ theme }).exec(input)!.groups! as PluginGroups;
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});

    const result = plugin({ input, groups, theme });

    expect(result).toEqual({});
    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });
});
