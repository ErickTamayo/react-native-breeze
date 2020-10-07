import { pattern, plugin, PluginGroups } from "../fontFamily";
import { PatternCallable, PluginFunctionReturnType } from "../types";

describe("fontFamily", () => {
  it("Should match the correct pattern", () => {
    const theme = jest
      .fn()
      .mockReturnValue({ sans: "Roboto", serif: "Georgia" });
    const callable = pattern as PatternCallable;

    expect(callable({ theme }).exec("font-sans")).toBeTruthy();
    expect(callable({ theme }).exec("font-serif")).toBeTruthy();

    expect(callable({ theme }).exec("font-unknown")).toBeFalsy();
  });

  // prettier-ignore
  it.each<[input: string, fontFamily: { [key: string]: string }, returned: string, expected: PluginFunctionReturnType]>([
    ["font-sans", { sans: 'Roboto', serif: 'Georgia' }, "Roboto", { fontFamily: "Roboto" }],
    ["font-serif", { sans: 'Roboto', serif: 'Georgia' }, "Georgia", { fontFamily: "Georgia" }],
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

  it("Should log error if the fontFamily value is not valid", () => {
    const theme = jest.fn();

    theme.mockReturnValueOnce({ sans: 1 });
    const input = "font-sans";
    const callable = pattern as PatternCallable;
    const groups = callable({ theme }).exec(input)!.groups! as PluginGroups;
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});

    theme.mockReturnValueOnce(1);
    const result = plugin({ input, groups, theme });

    expect(result).toEqual({});
    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });
});
