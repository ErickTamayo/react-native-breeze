import { pattern, plugin, PluginGroups } from "../letterSpacing";
import { PatternCallable, PluginFunctionReturnType } from "../types";

describe("letterSpacing", () => {
  it("Should match the correct pattern", () => {
    const theme = jest.fn().mockReturnValue({ normal: 0, wider: 0.8 });
    const callable = pattern as PatternCallable;

    expect(callable({ theme }).exec("tracking-normal")).toBeTruthy();
    expect(callable({ theme }).exec("tracking-wider")).toBeTruthy();

    expect(callable({ theme }).exec("tracking-unknown")).toBeFalsy();
  });

  // prettier-ignore
  it.each<[input: string, letterSpacing: { [key: string]: number }, returned: number, expected: PluginFunctionReturnType]>([
    ["tracking-normal", { normal: 0, wider: 0.8 }, 0, { letterSpacing: 0 }],
    ["tracking-wider", { normal: 0, wider: 0.8 }, 0.8, { letterSpacing: 0.8 }],
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

  it("Should log error if the letterSpacing value is not valid", () => {
    const theme = jest.fn();

    theme.mockReturnValueOnce({ normal: "0" });
    const input = "tracking-normal";
    const callable = pattern as PatternCallable;
    const groups = callable({ theme }).exec(input)!.groups! as PluginGroups;
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});

    theme.mockReturnValueOnce("0");
    const result = plugin({ input, groups, theme });

    expect(result).toEqual({});
    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });
});
