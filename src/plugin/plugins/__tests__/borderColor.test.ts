import { ColorObject } from "../../utils/colors";
import { pattern, plugin, PluginGroups } from "../borderColor";
import { PatternCallable, PluginFunctionReturnType } from "../types";

describe("borderColor", () => {
  it("Should match the correct pattern", () => {
    const theme = jest
      .fn()
      .mockReturnValue({ black: "#000000", green: { 500: "#00ff00" } });
    const callable = pattern as PatternCallable;

    expect(callable({ theme }).exec("border-green-500")).toBeTruthy();
    expect(callable({ theme }).exec("border-x-green-500")).toBeTruthy();
    expect(callable({ theme }).exec("border-y-green-500")).toBeTruthy();
    expect(callable({ theme }).exec("border-t-green-500")).toBeTruthy();
    expect(callable({ theme }).exec("border-b-green-500")).toBeTruthy();
    expect(callable({ theme }).exec("border-l-green-500")).toBeTruthy();
    expect(callable({ theme }).exec("border-r-green-500")).toBeTruthy();
    expect(callable({ theme }).exec("border-e-green-500")).toBeTruthy();
    expect(callable({ theme }).exec("border-s-green-500")).toBeTruthy();
    expect(callable({ theme }).exec("border-black")).toBeTruthy();

    expect(callable({ theme }).exec("border--green-500")).toBeFalsy();
    expect(callable({ theme }).exec("border-red-500")).toBeFalsy();
    expect(callable({ theme }).exec("border")).toBeFalsy();
    expect(callable({ theme }).exec("border-")).toBeFalsy();
    expect(callable({ theme }).exec("gb-green-500")).toBeFalsy();
  });

  // prettier-ignore
  it.each<
    [input: string, colors: ColorObject, expected: PluginFunctionReturnType]
  >([
    ["border-red-500", { red: { 500: "#ff0000" } }, { borderColor: "#ff0000" }],
    ["border-x-red-500", { red: { 500: "#ff0000" } }, { borderLeftColor: "#ff0000", borderRightColor: "#ff0000" }],
    ["border-y-red-500", { red: { 500: "#ff0000" } }, { borderTopColor: "#ff0000", borderBottomColor: "#ff0000" }],
    ["border-t-red-500", { red: { 500: "#ff0000" } }, { borderTopColor: "#ff0000" }],
    ["border-b-red-500", { red: { 500: "#ff0000" } }, { borderBottomColor: "#ff0000" }],
    ["border-l-red-500", { red: { 500: "#ff0000" } }, { borderLeftColor: "#ff0000" }],
    ["border-r-red-500", { red: { 500: "#ff0000" } }, { borderRightColor: "#ff0000" }],
    ["border-s-red-500", { red: { 500: "#ff0000" } }, { borderStartColor: "#ff0000" }],
    ["border-e-red-500", { red: { 500: "#ff0000" } }, { borderEndColor: "#ff0000" }],
    ["border-black", { black: "#000000" }, { borderColor: "#000000" }],
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

  it("Should log error if the color is not valid", () => {
    const theme = jest.fn().mockReturnValue({ red: { 500: 0 } });
    const input = "border-red-500";
    const callable = pattern as PatternCallable;
    const groups = callable({ theme }).exec(input)!.groups! as PluginGroups;
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});

    const result = plugin({ input, groups, theme });

    expect(result).toEqual({});
    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });
});
