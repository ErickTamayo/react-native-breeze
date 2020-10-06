import { pattern, plugin, PluginGroups } from "../elevation";
import { PatternCallable, PluginFunctionReturnType } from "../types";

describe("elevation", () => {
  it("Should match the correct pattern", () => {
    const theme = jest.fn().mockReturnValue({ default: 1, md: 2 });
    const callable = pattern as PatternCallable;

    expect(callable({ theme }).exec("elevated")).toBeTruthy();
    expect(callable({ theme }).exec("elevated-md")).toBeTruthy();

    expect(callable({ theme }).exec("elevated-lg")).toBeFalsy();
  });

  // prettier-ignore
  it.each<[input: string, width: { [key: string]: number }, returned: number, expected: PluginFunctionReturnType]>([
    ["elevated", { default: 1, md: 2 }, 1, { elevation: 1 }],
    ["elevated-md", { default: 1, md: 2 }, 2, { elevation: 2 }],
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

  it("Should log error if the elevation is not valid", () => {
    const theme = jest.fn();

    theme.mockReturnValueOnce({ md: "2" });
    const input = "elevated-md";
    const callable = pattern as PatternCallable;
    const groups = callable({ theme }).exec(input)!.groups! as PluginGroups;
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});

    theme.mockReturnValueOnce("2");
    const result = plugin({ input, groups, theme });

    expect(result).toEqual({});
    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });
});
