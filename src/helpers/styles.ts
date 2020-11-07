import {
  StyleProp,
  ViewStyle,
  ImageStyle,
  TextStyle,
  PlatformOSType,
} from "react-native";
import merge from "deepmerge";
import { getStyleFromString } from "./plugins";
import { keys, theme } from "../config";
import memoize from "fast-memoize";

export type ReactNativeStyle =
  | StyleProp<ViewStyle>
  | StyleProp<ImageStyle>
  | StyleProp<TextStyle>;

export type MediaStyle = {
  focus?: ReactNativeStyle;
  hover?: ReactNativeStyle;
  landscape?: ReactNativeStyle;
  portrait?: ReactNativeStyle;
  base?: ReactNativeStyle;
};

export type PlatformStyle = {
  [media: number]: MediaStyle;
  all?: MediaStyle;
};

export type BreezeStyle = {
  [platform in PlatformOSType]?: PlatformStyle;
} & {
  native?: PlatformStyle;
  default?: PlatformStyle;
};

export const generateStyleFromInput = memoize(
  (input: string): BreezeStyle => {
    const variantKeys = ["focus", "hover", "landscape", "portrait"].join("|");
    const platformKeys = [
      "ios",
      "android",
      "macos",
      "windows",
      "web",
      "native",
    ].join("|");
    const screenKeys = keys("screens");

    // prettier-ignore
    const regex = new RegExp(`(?<platform>${platformKeys})?:?(?<media>${screenKeys})?:?(?<variant>${variantKeys})?:?(?<style>[\\w-_]+)`);

    const styleStrings = input
      .split(" ")
      .map((v) => v.trim())
      .filter(Boolean);

    return styleStrings.reduce<BreezeStyle>((acc, styleString) => {
      const result = regex.exec(styleString);

      if (!result) {
        console.warn(`Could not parse ${styleString}`);
        return acc;
      }

      const {
        variant = "base",
        platform = "default",
        media,
        style,
      } = result.groups!;

      const styleObject: Partial<MediaStyle> = {
        [platform]: {
          [theme(["screens", media], "all")]: {
            [variant]: getStyleFromString(style),
          },
        },
      };

      return merge(acc, styleObject);
    }, {});
  }
);
