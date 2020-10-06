import { pattern, plugin, PluginGroups } from "../borderRadius";
import { PatternCallable, PluginFunctionReturnType } from "../types";

describe("borderRadius", () => {
  it("Should match the correct pattern", () => {
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
    ["rounded-t", { default: 4, md: 2 }, 4, { borderTopRadius: 4 } as any], //TODO check why this typing is failing
    ["rounded-r", { default: 4, md: 2 }, 4, { borderRightRadius: 4 }],
    ["rounded-b", { default: 4, md: 2 }, 4, { borderBottomRadius: 4 }],
    ["rounded-l", { default: 4, md: 2 }, 4, { borderLeftRadius: 4 }],
    ["rounded-s", { default: 4, md: 2 }, 4, { borderStartRadius: 4 }],
    ["rounded-e", { default: 4, md: 2 }, 4, { borderEndRadius: 4 }],
    ["rounded-tl", { default: 4, md: 2 }, 4, { borderTopLeftRadius: 4 }],
    ["rounded-tr", { default: 4, md: 2 }, 4, { borderTopRightRadius: 4 }],
    ["rounded-br", { default: 4, md: 2 }, 4, { borderBottomRightRadius: 4 }],
    ["rounded-bl", { default: 4, md: 2 }, 4, { borderBottomLeftRadius: 4 }],
    ["rounded-md", { default: 4, md: 2 }, 2, { borderRadius: 2 }],
    ["rounded-t-md", { default: 4, md: 2 }, 2, { borderTopRadius: 2 } as any], //TODO check why this typing is failing
    ["rounded-r-md", { default: 4, md: 2 }, 2, { borderRightRadius: 2 }],
    ["rounded-b-md", { default: 4, md: 2 }, 2, { borderBottomRadius: 2 }],
    ["rounded-l-md", { default: 4, md: 2 }, 2, { borderLeftRadius: 2 }],
    ["rounded-s-md", { default: 4, md: 2 }, 2, { borderStartRadius: 2 }],
    ["rounded-e-md", { default: 4, md: 2 }, 2, { borderEndRadius: 2 }],
    ["rounded-tl-md", { default: 4, md: 2 }, 2, { borderTopLeftRadius: 2 }],
    ["rounded-tr-md", { default: 4, md: 2 }, 2, { borderTopRightRadius: 2 }],
    ["rounded-br-md", { default: 4, md: 2 }, 2, { borderBottomRightRadius: 2 }],
    ["rounded-bl-md", { default: 4, md: 2 }, 2, { borderBottomLeftRadius: 2 }],
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

  it("Should log error if the borderRadius is not valid", () => {
    const theme = jest.fn();

    theme.mockReturnValueOnce({ default: "0" });
    const input = "rounded";
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
