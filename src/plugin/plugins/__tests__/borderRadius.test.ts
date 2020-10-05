import { pattern, plugin, PluginGroups } from "../borderRadius";
import { PatternCallable, PluginFunctionReturnType } from "../types";

describe("borderRadius", () => {
  it("Should match the correct color pattern", () => {
    const theme = jest.fn().mockReturnValue({ md: 2, default: 4 });
    const callable = pattern as PatternCallable;

    expect(callable({ theme }).exec("rounded")).toBeTruthy();
    expect(callable({ theme }).exec("rounded-md")).toBeTruthy();

    expect(callable({ theme }).exec("rounded-t")).toBeTruthy();
    expect(callable({ theme }).exec("rounded-r")).toBeTruthy();
    expect(callable({ theme }).exec("rounded-b")).toBeTruthy();
    expect(callable({ theme }).exec("rounded-l")).toBeTruthy();
    expect(callable({ theme }).exec("rounded-s")).toBeTruthy();
    expect(callable({ theme }).exec("rounded-e")).toBeTruthy();
    expect(callable({ theme }).exec("rounded-tl")).toBeTruthy();
    expect(callable({ theme }).exec("rounded-tr")).toBeTruthy();
    expect(callable({ theme }).exec("rounded-ts")).toBeTruthy();
    expect(callable({ theme }).exec("rounded-te")).toBeTruthy();
    expect(callable({ theme }).exec("rounded-br")).toBeTruthy();
    expect(callable({ theme }).exec("rounded-bl")).toBeTruthy();
    expect(callable({ theme }).exec("rounded-bs")).toBeTruthy();
    expect(callable({ theme }).exec("rounded-be")).toBeTruthy();

    expect(callable({ theme }).exec("rounded-t-md")).toBeTruthy();
    expect(callable({ theme }).exec("rounded-r-md")).toBeTruthy();
    expect(callable({ theme }).exec("rounded-b-md")).toBeTruthy();
    expect(callable({ theme }).exec("rounded-l-md")).toBeTruthy();
    expect(callable({ theme }).exec("rounded-s-md")).toBeTruthy();
    expect(callable({ theme }).exec("rounded-e-md")).toBeTruthy();
    expect(callable({ theme }).exec("rounded-tl-md")).toBeTruthy();
    expect(callable({ theme }).exec("rounded-tr-md")).toBeTruthy();
    expect(callable({ theme }).exec("rounded-ts-md")).toBeTruthy();
    expect(callable({ theme }).exec("rounded-te-md")).toBeTruthy();
    expect(callable({ theme }).exec("rounded-br-md")).toBeTruthy();
    expect(callable({ theme }).exec("rounded-bl-md")).toBeTruthy();
    expect(callable({ theme }).exec("rounded-bs-md")).toBeTruthy();
    expect(callable({ theme }).exec("rounded-be-md")).toBeTruthy();

    expect(callable({ theme }).exec("rounded-unknown")).toBeFalsy();
    expect(callable({ theme }).exec("rounded-t-unknown")).toBeFalsy();
    expect(callable({ theme }).exec("rounded-r-unknown")).toBeFalsy();
    expect(callable({ theme }).exec("rounded-b-unknown")).toBeFalsy();
    expect(callable({ theme }).exec("rounded-l-unknown")).toBeFalsy();
    expect(callable({ theme }).exec("rounded-tl-unknown")).toBeFalsy();
    expect(callable({ theme }).exec("rounded-tr-unknown")).toBeFalsy();
    expect(callable({ theme }).exec("rounded-br-unknown")).toBeFalsy();
    expect(callable({ theme }).exec("rounded-bl-unknown")).toBeFalsy();
  });

  // prettier-ignore
  it.each<[input: string, radii: { [key: string]: number }, returned: number, expected: PluginFunctionReturnType]>([
    ["rounded", { default: 4, md: 2 }, 4, { borderRadius: 4 }],
    ["rounded-md", { default: 4, md: 2 }, 2, { borderRadius: 2 }],
    ["rounded-t", { default: 4, md: 2 }, 4, { borderTopRadius: 4 } as any], //TODO check why tf this typing is failing
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

  // it("Should log error if the color is not valid", () => {
  //   const theme = jest.fn().mockReturnValue({ red: { 500: 0 } });
  //   const input = "border-red-500";
  //   const callable = pattern as PatternCallable;
  //   const groups = callable({ theme }).exec(input)!.groups! as PluginGroups;
  //   const spy = jest.spyOn(console, "error").mockImplementation(() => {});

  //   const result = plugin({ input, groups, theme });

  //   expect(result).toEqual({});
  //   expect(spy).toHaveBeenCalled();

  //   spy.mockRestore();
  // });
});
