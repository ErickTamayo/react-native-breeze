import { pattern, plugin, PluginGroups } from "../fontSize";
import { PatternCallable, PluginFunctionReturnType } from "../types";

describe("fontSize", () => {
  it("Should match the correct pattern", () => {
    const theme = jest.fn().mockReturnValue({ xs: 12, md: 14 });
    const callable = pattern as PatternCallable;

    expect(callable({ theme }).exec("text-xs")).toBeTruthy();
    expect(callable({ theme }).exec("text-md")).toBeTruthy();

    expect(callable({ theme }).exec("text-unknown")).toBeFalsy();
  });

  // prettier-ignore
  it.each<[input: string, fontSize: { [key: string]: number }, returned: number, expected: PluginFunctionReturnType]>([
    ["text-xs", { xs: 12, md: 14 }, 12, { fontSize: 12 }],
    ["text-md", { xs: 12, md: 14 }, 14, { fontSize: 14 }],
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

  it("Should log error if the text is not valid", () => {
    const theme = jest.fn();

    theme.mockReturnValueOnce({ 10: "0.1" });
    const input = "text-10";
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
