import { pattern, plugin, PluginGroups } from "../borderWidth";
import { PatternCallable, PluginFunctionReturnType } from "../types";

describe("borderWidth", () => {
  it("Should match the correct pattern", () => {
    const theme = jest.fn().mockReturnValue({ 2: 2, default: 1 });
    const callable = pattern as PatternCallable;

    expect(callable({ theme }).exec("border")).toBeTruthy();
    expect(callable({ theme }).exec("border-2")).toBeTruthy();

    expect(callable({ theme }).exec("border-t")).toBeTruthy();
    expect(callable({ theme }).exec("border-r")).toBeTruthy();
    expect(callable({ theme }).exec("border-b")).toBeTruthy();
    expect(callable({ theme }).exec("border-l")).toBeTruthy();
    expect(callable({ theme }).exec("border-s")).toBeTruthy();
    expect(callable({ theme }).exec("border-e")).toBeTruthy();
    expect(callable({ theme }).exec("border-tl")).toBeTruthy();
    expect(callable({ theme }).exec("border-tr")).toBeTruthy();
    expect(callable({ theme }).exec("border-ts")).toBeTruthy();
    expect(callable({ theme }).exec("border-te")).toBeTruthy();
    expect(callable({ theme }).exec("border-br")).toBeTruthy();
    expect(callable({ theme }).exec("border-bl")).toBeTruthy();
    expect(callable({ theme }).exec("border-bs")).toBeTruthy();
    expect(callable({ theme }).exec("border-be")).toBeTruthy();

    expect(callable({ theme }).exec("border-t-2")).toBeTruthy();
    expect(callable({ theme }).exec("border-r-2")).toBeTruthy();
    expect(callable({ theme }).exec("border-b-2")).toBeTruthy();
    expect(callable({ theme }).exec("border-l-2")).toBeTruthy();
    expect(callable({ theme }).exec("border-s-2")).toBeTruthy();
    expect(callable({ theme }).exec("border-e-2")).toBeTruthy();
    expect(callable({ theme }).exec("border-tl-2")).toBeTruthy();
    expect(callable({ theme }).exec("border-tr-2")).toBeTruthy();
    expect(callable({ theme }).exec("border-ts-2")).toBeTruthy();
    expect(callable({ theme }).exec("border-te-2")).toBeTruthy();
    expect(callable({ theme }).exec("border-br-2")).toBeTruthy();
    expect(callable({ theme }).exec("border-bl-2")).toBeTruthy();
    expect(callable({ theme }).exec("border-bs-2")).toBeTruthy();
    expect(callable({ theme }).exec("border-be-2")).toBeTruthy();

    expect(callable({ theme }).exec("border-unknown")).toBeFalsy();
    expect(callable({ theme }).exec("border-t-unknown")).toBeFalsy();
    expect(callable({ theme }).exec("border-r-unknown")).toBeFalsy();
    expect(callable({ theme }).exec("border-b-unknown")).toBeFalsy();
    expect(callable({ theme }).exec("border-l-unknown")).toBeFalsy();
    expect(callable({ theme }).exec("border-tl-unknown")).toBeFalsy();
    expect(callable({ theme }).exec("border-tr-unknown")).toBeFalsy();
    expect(callable({ theme }).exec("border-br-unknown")).toBeFalsy();
    expect(callable({ theme }).exec("border-bl-unknown")).toBeFalsy();
  });

  // prettier-ignore
  it.each<[input: string, width: { [key: string]: number }, returned: number, expected: PluginFunctionReturnType]>([
    ["border", { default: 1, 2: 2 }, 4, { borderWidth: 4 }],
    ["border-t", { default: 1, 2: 2 }, 4, { borderTopWidth: 4 } as any], //TODO check why this typing is failing
    ["border-r", { default: 1, 2: 2 }, 4, { borderRightWidth: 4 }],
    ["border-b", { default: 1, 2: 2 }, 4, { borderBottomWidth: 4 }],
    ["border-l", { default: 1, 2: 2 }, 4, { borderLeftWidth: 4 }],
    ["border-s", { default: 1, 2: 2 }, 4, { borderStartWidth: 4 }],
    ["border-e", { default: 1, 2: 2 }, 4, { borderEndWidth: 4 }],
    ["border-tl", { default: 1, 2: 2 }, 4, { borderTopLeftWidth: 4 }],
    ["border-tr", { default: 1, 2: 2 }, 4, { borderTopRightWidth: 4 }],
    ["border-br", { default: 1, 2: 2 }, 4, { borderBottomRightWidth: 4 }],
    ["border-bl", { default: 1, 2: 2 }, 4, { borderBottomLeftWidth: 4 }],
    ["border-2", { default: 1, 2: 2 }, 2, { borderWidth: 2 }],
    ["border-t-2", { default: 1, 2: 2 }, 2, { borderTopWidth: 2 } as any], //TODO check why this typing is failing
    ["border-r-2", { default: 1, 2: 2 }, 2, { borderRightWidth: 2 }],
    ["border-b-2", { default: 1, 2: 2 }, 2, { borderBottomWidth: 2 }],
    ["border-l-2", { default: 1, 2: 2 }, 2, { borderLeftWidth: 2 }],
    ["border-s-2", { default: 1, 2: 2 }, 2, { borderStartWidth: 2 }],
    ["border-e-2", { default: 1, 2: 2 }, 2, { borderEndWidth: 2 }],
    ["border-tl-2", { default: 1, 2: 2 }, 2, { borderTopLeftWidth: 2 }],
    ["border-tr-2", { default: 1, 2: 2 }, 2, { borderTopRightWidth: 2 }],
    ["border-br-2", { default: 1, 2: 2 }, 2, { borderBottomRightWidth: 2 }],
    ["border-bl-2", { default: 1, 2: 2 }, 2, { borderBottomLeftWidth: 2 }],
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

  it("Should log error if the borderWidth value is not valid", () => {
    const theme = jest.fn();

    theme.mockReturnValueOnce({ default: "0" });
    const input = "border";
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
