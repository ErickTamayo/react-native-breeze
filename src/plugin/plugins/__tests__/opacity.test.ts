import { pattern, plugin, PluginGroups } from "../opacity";
import { PatternCallable, PluginFunctionReturnType } from "../types";

describe("borderWidth", () => {
  it("Should match the correct pattern", () => {
    const theme = jest.fn().mockReturnValue({ 10: 0.1, 100: 1 });
    const callable = pattern as PatternCallable;

    expect(callable({ theme }).exec("opacity-10")).toBeTruthy();
    expect(callable({ theme }).exec("opacity-100")).toBeTruthy();

    expect(callable({ theme }).exec("opacity-50")).toBeFalsy();
  });

  // prettier-ignore
  it.each<[input: string, width: { [key: string]: number }, returned: number, expected: PluginFunctionReturnType]>([
    ["opacity-10", { 10: 0.1, 100: 1 }, 0.1, { opacity: 0.1 }],
    ["opacity-100", { 10: 0.1, 100: 1 }, 1, { opacity: 1 }],
   ])(
    "Should parse (%s) correctly",
    (input, radii, returned, expected) => {
      const theme = jest.fn()

      theme.mockReturnValueOnce(radii);
      const callable = pattern as PatternCallable;
      const groups = callable({ theme }).exec(input)!.groups! as PluginGroups;

      theme.mockReturnValueOnce(returned);
      const result = plugin({ input, groups, theme });

      expect(result).toEqual(expected);
    }
  );

  it("Should log error if the opacity is not valid", () => {
    const theme = jest.fn();

    theme.mockReturnValueOnce({ 10: "0.1" });
    const input = "opacity-10";
    const callable = pattern as PatternCallable;
    const groups = callable({ theme }).exec(input)!.groups! as PluginGroups;
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});

    theme.mockReturnValueOnce("0.1");
    const result = plugin({ input, groups, theme });

    expect(result).toEqual({});
    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });
});
