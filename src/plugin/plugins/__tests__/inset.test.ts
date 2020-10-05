import { pattern, plugin, PluginGroups } from "../inset";
import { PatternCallable, PluginFunctionReturnType } from "../types";

describe("inset", () => {
  it("Should match the correct inset pattern", () => {
    const theme = jest.fn().mockReturnValue({ 0: 0, "-1": -1 });
    const callable = pattern as PatternCallable;

    expect(callable({ theme }).exec("inset-0")).toBeTruthy();
    expect(callable({ theme }).exec("-inset-1")).toBeTruthy();

    expect(callable({ theme }).exec("inset-y-0")).toBeTruthy();
    expect(callable({ theme }).exec("inset-x-0")).toBeTruthy();
    expect(callable({ theme }).exec("-inset-y-1")).toBeTruthy();
    expect(callable({ theme }).exec("-inset-x-1")).toBeTruthy();

    expect(callable({ theme }).exec("top-0")).toBeTruthy();
    expect(callable({ theme }).exec("right-0")).toBeTruthy();
    expect(callable({ theme }).exec("left-0")).toBeTruthy();
    expect(callable({ theme }).exec("bottom-0")).toBeTruthy();
    expect(callable({ theme }).exec("start-0")).toBeTruthy();
    expect(callable({ theme }).exec("end-0")).toBeTruthy();

    expect(callable({ theme }).exec("-top-1")).toBeTruthy();
    expect(callable({ theme }).exec("-right-1")).toBeTruthy();
    expect(callable({ theme }).exec("-start-1")).toBeTruthy();
    expect(callable({ theme }).exec("-end-1")).toBeTruthy();

    expect(callable({ theme }).exec("inset")).toBeFalsy();
    expect(callable({ theme }).exec("inset-y")).toBeFalsy();
    expect(callable({ theme }).exec("inset-x")).toBeFalsy();
    expect(callable({ theme }).exec("left")).toBeFalsy();
    expect(callable({ theme }).exec("right")).toBeFalsy();
    expect(callable({ theme }).exec("bottom")).toBeFalsy();
    expect(callable({ theme }).exec("start")).toBeFalsy();
    expect(callable({ theme }).exec("end")).toBeFalsy();

    expect(callable({ theme }).exec("inset-")).toBeFalsy();
    expect(callable({ theme }).exec("inset-y-")).toBeFalsy();
    expect(callable({ theme }).exec("inset-x-")).toBeFalsy();
    expect(callable({ theme }).exec("left-")).toBeFalsy();
    expect(callable({ theme }).exec("right-")).toBeFalsy();
    expect(callable({ theme }).exec("bottom-")).toBeFalsy();
    expect(callable({ theme }).exec("start-")).toBeFalsy();
    expect(callable({ theme }).exec("end-")).toBeFalsy();
  });

  // prettier-ignore
  it.each<[input: string, inset: { [key: string]: number }, value: number, expected: PluginFunctionReturnType]>([
    ["inset-0", { 0: -1 }, 0, { top: 0, right: 0, bottom: 0, left: 0 }],
    ["inset-x-0", { 0: 0 }, 0, { right: 0, left: 0 }],
    ["inset-y-0", { 0: 0 }, 0, { top: 0, bottom: 0 }],
    ["top-0", { 0: 0 }, 0, { top: 0 }],
    ["right-0", { 0: 0 }, 0, { right: 0 }],
    ["bottom-0", { 0: 0 }, 0, { bottom: 0}],
    ["left-0", { 0: 0 }, 0, { left: 0}],
    ["start-0", { 0: 0 }, 0, { start: 0}],
    ["end-0", { 0: 0 }, 0, { end: 0}],

    ["-inset-1", { "-1": -1 }, -1, { top: -1, right: -1, bottom: -1, left: -1 }],
    ["-inset-x-1", { "-1": -1 }, -1, { right: -1, left: -1 }],
    ["-inset-y-1", { "-1": -1 }, -1, { top: -1, bottom: -1 }],
    ["-top-1", { "-1": -1 }, -1, { top: -1 }],
    ["-right-1", { "-1": -1 }, -1, { right: -1 }],
    ["-bottom-1", { "-1": -1 }, -1, { bottom: -1}],
    ["-left-1", { "-1": -1 }, -1, { left: -1}],
    ["-start-1", { "-1": -1 }, -1, { start: -1}],
    ["-end-1", { "-1": -1 }, -1, { end: -1}],
  ])(
    "Should parse %s style correctly",
    (input, inset, value , expected) => {
      const theme = jest.fn();
      theme.mockReturnValueOnce(inset)
      const callable = pattern as PatternCallable;
      const groups = callable({ theme }).exec(input)!.groups! as PluginGroups;

      theme.mockReturnValueOnce(value);
      const result = plugin({ input, groups, theme });

      expect(result).toEqual(expected);
    }
  );

  it("Should log error if the inset value is not valid", () => {
    const theme = jest.fn();

    theme.mockReturnValueOnce({ 0: undefined });
    const input = "inset-0";
    const callable = pattern as PatternCallable;
    const groups = callable({ theme }).exec(input)!.groups! as PluginGroups;
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});

    theme.mockReturnValueOnce(undefined);
    const result = plugin({ input, groups, theme });

    expect(result).toEqual({});
    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });
});
