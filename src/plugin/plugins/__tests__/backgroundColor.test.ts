import { pattern, plugin, PluginGroups } from "../backgroundColor";

describe("backgroundColor", () => {
  it("Should match the correct color pattern", () => {
    expect(pattern.exec("bg-green-500")).toBeTruthy();
    expect(pattern.exec("bg-black")).toBeTruthy();
    expect(pattern.exec("bg--green-500")).toBeTruthy();
    expect(pattern.exec("bg--green--500")).toBeTruthy();
    expect(pattern.exec("bg")).toBeFalsy();
    expect(pattern.exec("bg-")).toBeFalsy();
    expect(pattern.exec("gb-green-500")).toBeFalsy();
  });

  it("Should parse the correct color", () => {
    const theme = jest.fn().mockReturnValue("#ffffff");
    const input = "bg-white";
    const groups = { color: "white" };

    const result = plugin({ input, groups, theme });

    expect(result).toEqual({ backgroundColor: "#ffffff" });
    expect(theme.mock.calls[0][0]).toEqual(["colors", "white"]);
  });

  it.each<[string, string[]]>([
    ["bg-red-500", ["colors", "red", "500"]],
    ["bg-deep-nested-color-500", ["colors", "deep", "nested", "color", "500"]],
    ["bg-black", ["colors", "black"]],
    ["bg-----pink----500", ["colors", "pink", "500"]],
  ])("Should parse (%s) correctly", (input, expected) => {
    const theme = jest.fn().mockReturnValue("color");
    const groups = pattern.exec(input)!.groups! as PluginGroups;

    const result = plugin({ input, groups, theme });

    expect(result).toEqual({ backgroundColor: "color" });
    expect(theme.mock.calls[0][0]).toEqual(expected);
  });

  // it("Should parse the correct full color", () => {
  //   const theme = jest.fn().mockReturnValue("#ff0000");
  //   const input = "bg-red-500";
  //   const groups = { color: "red", number: "500" };

  //   const result = plugin({ input, groups, theme });

  //   expect(result).toEqual({ backgroundColor: "#ff0000" });
  //   expect(theme.mock.calls[0][0]).toEqual(["colors", "red", "500"]);
  // });

  it("Should error if the colors is not found", () => {
    const theme = jest.fn().mockReturnValue(undefined);
    const input = "bg-unknown-500";
    const groups = pattern.exec(input)!.groups! as PluginGroups;
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});

    const result = plugin({ input, groups, theme });

    expect(result).toEqual({});
    expect(theme.mock.calls[0][0]).toEqual(["colors", "unknown", "500"]);
    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });
});
