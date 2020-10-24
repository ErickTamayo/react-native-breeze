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

export type VariantsStyle = {
  focus?: ReactNativeStyle;
  hover?: ReactNativeStyle;
  landscape?: ReactNativeStyle;
  portrait?: ReactNativeStyle;
  base?: ReactNativeStyle;
};

export type MediaStyle = {
  [media: number]: VariantsStyle;
  all?: VariantsStyle;
};

export type BreezeStyle = {
  [platform in PlatformOSType]?: MediaStyle;
} & {
  native?: MediaStyle;
  default?: MediaStyle;
};

export const generateStyleFromInput = (input: string): BreezeStyle => {
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

    const styleObject: Partial<VariantsStyle> = {
      [platform]: {
        [theme(["screens", media], "all")]: {
          [variant]: getStyleFromString(style),
        },
      },
    };

    return merge(acc, styleObject);
  }, {});
};
