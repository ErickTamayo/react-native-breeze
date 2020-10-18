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

export type ReactNativeStyle =
  | StyleProp<ViewStyle>
  | StyleProp<ImageStyle>
  | StyleProp<TextStyle>;

export type MediaStyle = {
  [media: number]: ReactNativeStyle;
  all?: ReactNativeStyle;
};

export type VariantsStyles = {
  focus?: MediaStyle;
  hover?: MediaStyle;
  landscape?: MediaStyle;
  portrait?: MediaStyle;
  base?: MediaStyle;
};

export type PlatformStyles = {
  [platform in PlatformOSType]?: VariantsStyles;
} & {
  native?: VariantsStyles;
  default?: VariantsStyles;
};

export const generateStyleFromInput = (input: string): PlatformStyles => {
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

  return styleStrings.reduce<PlatformStyles>((acc, styleString) => {
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

    const styleObject: Partial<VariantsStyles> = {
      [platform]: {
        [variant]: {
          [theme(["screens", media], "all")]: getStyleFromString(style),
        },
      },
    };

    return merge(acc, styleObject);
  }, {});
};
