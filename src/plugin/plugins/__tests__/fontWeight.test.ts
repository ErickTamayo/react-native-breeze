import { pattern, plugin, PluginGroups } from "../fontWeight";
import { PatternCallable, PluginFunctionReturnType } from "../types";

describe("fontWeight", () => {
  it("Should match the correct pattern", () => {
    const theme = jest.fn().mockReturnValue({ normal: "400", medium: "500" });
    const callable = pattern as PatternCallable;

    expect(callable({ theme }).exec("font-normal")).toBeTruthy();
    expect(callable({ theme }).exec("font-medium")).toBeTruthy();

    expect(callable({ theme }).exec("font-unknown")).toBeFalsy();
  });

  // prettier-ignore
  it.each<[input: string, fontSize: { [key: string]: string }, returned: string, expected: PluginFunctionReturnType]>([
    ["font-normal", { normal: "400", medium: "500" }, "400", { fontWeight: "400" }],
    ["font-medium", { normal: "400", medium: "500" }, "500", { fontWeight: "500" }],
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

  it("Should log error if the fontWeight value is not valid", () => {
    const theme = jest.fn();

    theme.mockReturnValueOnce({ normal: 400, medium: "500" });
    const input = "font-normal";
    const callable = pattern as PatternCallable;
    const groups = callable({ theme }).exec(input)!.groups! as PluginGroups;
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});

    theme.mockReturnValueOnce(400);
    const result = plugin({ input, groups, theme });

    expect(result).toEqual({});
    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });
});
