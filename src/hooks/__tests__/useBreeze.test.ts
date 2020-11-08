import { renderHook, act } from "@testing-library/react-hooks";
import { Platform, Dimensions } from "react-native";
import useBreeze from "../useBreeze";

describe("useBreeze", () => {
  afterAll(() => {
    Platform.OS = "ios";
  });

  it("should parse the correct regular style", () => {
    const { result } = renderHook(() => useBreeze());
    expect(result.current.parse("bg-gray-500")).toMatchSnapshot();
  });

  describe.each([
    undefined,
    "native:",
    "ios:",
    "android:",
    "macos:",
    "windows:",
    "web:",
  ])("platform %s", (platform = "") => {
    beforeEach(() => {
      Platform.OS = platform.replace(":", "") as any;
    });

    it("should parse the correct style", () => {
      const { result } = renderHook(() => useBreeze());
      const style = `${platform}w-0`;
      expect(result.current.parse(style)).toEqual({ width: 0 });
    });

    describe.each([
      [undefined, 0],
      ["sm:", 640],
      ["md:", 768],
      ["lg:", 1024],
      ["xl:", 1280],
    ])("media %s", (media = "", width) => {
      beforeEach(() => {
        (Dimensions as any).get = jest.fn(() => ({ height: 1, width }));
      });

      it("should parse the correct media style", () => {
        const { result } = renderHook(() => useBreeze());
        const style = `${platform}${media}:w-0`;
        expect(result.current.parse(style)).toEqual({ width: 0 });
      });

      it(`should parse the correct hovered style`, () => {
        const { result } = renderHook(() => useBreeze());
        const style = `${platform}${media}hover:w-0`;
        const onMouseEnter = jest.fn();
        const onMouseLeave = jest.fn();

        act(() => {
          result.current.handleOnMouseEnter(onMouseEnter)({});
        });

        expect(result.current.parse(style)).toEqual({ width: 0 });
        expect(onMouseEnter).toHaveBeenCalled();

        act(() => {
          result.current.handleOnMouseLeave(onMouseLeave)({});
        });

        expect(result.current.parse(style)).toEqual({});
        expect(onMouseLeave).toHaveBeenCalled();
      });

      it(`should parse the correct focused style`, () => {
        const { result } = renderHook(() => useBreeze());
        const style = `${platform}${media}focus:w-0`;
        const onFocus = jest.fn();
        const onBlur = jest.fn();

        act(() => {
          result.current.handleOnFocus(onFocus)({});
        });

        expect(result.current.parse(style)).toEqual({ width: 0 });
        expect(onFocus).toHaveBeenCalled();

        act(() => {
          result.current.handleOnBlur(onBlur)({});
        });

        expect(result.current.parse(style)).toEqual({});
        expect(onBlur).toHaveBeenCalled();
      });

      if (["ios:", "android:"].includes(platform)) {
        describe.each([
          ["landscape", (width || 1) * 2, width || 1],
          ["portrait", width || 1, (width || 1) * 2],
        ])("%s", (orientation, width, height) => {
          beforeEach(() => {
            (Dimensions as any).get = jest.fn(() => ({ height, width }));
          });

          it(`should parse the correct style in ${orientation}`, () => {
            const { result } = renderHook(() => useBreeze());
            const style = `${platform}${media}${orientation}:w-0`;

            expect(result.current.parse(style)).toEqual({ width: 0 });
          });
        });
      }
    });
  });
});
