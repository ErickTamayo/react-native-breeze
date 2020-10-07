import { pattern, plugin, PluginGroups } from "../lineHeight";
import { PatternCallable, PluginFunctionReturnType } from "../types";

describe("lineHeight", () => {
  it("Should match the correct pattern", () => {
    const theme = jest.fn().mockReturnValue({ 3: 12, 4: 16 });
    const callable = pattern as PatternCallable;

    expect(callable({ theme }).exec("leading-3")).toBeTruthy();
    expect(callable({ theme }).exec("leading-4")).toBeTruthy();

    expect(callable({ theme }).exec("leading-unknown")).toBeFalsy();
  });

  // prettier-ignore
  it.each<[input: string, lineHeight: { [key: string]: number }, returned: number, expected: PluginFunctionReturnType]>([
    ["leading-3", { 3: 12, 4: 16 }, 12, { lineHeight: 12 }],
    ["leading-4", { 3: 12, 4: 16 }, 16, { lineHeight: 16 }],
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

  it("Should log error if the lineHeight is not valid", () => {
    const theme = jest.fn();

    theme.mockReturnValueOnce({ 3: "12" });
    const input = "leading-3";
    const callable = pattern as PatternCallable;
    const groups = callable({ theme }).exec(input)!.groups! as PluginGroups;
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});

    theme.mockReturnValueOnce("12");
    const result = plugin({ input, groups, theme });

    expect(result).toEqual({});
    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });
});
