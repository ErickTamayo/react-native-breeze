import {
  Platform,
  StyleProp,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from "react-native";
import merge from "deepmerge";
import { getStyleFromString } from "./plugins";
import { keys } from "../config";

export type ReactNativeStyle =
  | StyleProp<ViewStyle>
  | StyleProp<ImageStyle>
  | StyleProp<TextStyle>;

// export type VariantStyle = {
//   focus?: ReactNativeStyle;
//   hover?: ReactNativeStyle;
//   landscape?: ReactNativeStyle;
//   portrait?: ReactNativeStyle;
//   base?: ReactNativeStyle; // Applied to all under media / platform
// };

export type MediaStyle = {
  [media: string]: ReactNativeStyle;
  all?: ReactNativeStyle;
};

export type PlatformStyles = {
  ios?: MediaStyle;
  android?: MediaStyle;
  web?: MediaStyle;
  native?: MediaStyle;
  default?: MediaStyle;
};

export type VariantsStyles = {
  focus?: PlatformStyles;
  hover?: PlatformStyles;
  landscape?: PlatformStyles;
  portrait?: PlatformStyles;
  base?: PlatformStyles;
};

export const generateStyle = (input: string): VariantsStyles => {
  const variantKeys = ["focus", "hover", "landscape", "portrait"].join("|");
  const platformKeys = ["ios", "android", "web", "native"].join("|");
  const screenKeys = keys("screens");

  // prettier-ignore
  const regex = new RegExp(`(?<platform>${platformKeys})?:?(?<media>${screenKeys})?:?(?<variant>${variantKeys})?:?(?<style>[\\w-_]+)`);

  const styleStrings = input
    .split(" ")
    .map((v) => v.trim())
    .filter(Boolean);

  return styleStrings.reduce<VariantsStyles>((acc, styleString) => {
    const result = regex.exec(styleString);

    if (!result) {
      console.warn(`Could not parse ${styleString}`);
      return acc;
    }

    // prettier-ignore
    const { variant = "base", platform = "default", media = "all", style, } = result.groups!;

    const styleObject: Partial<VariantsStyles> = {
      [variant]: { [platform]: { [media]: getStyleFromString(style) } },
    };

    return merge(acc, styleObject);
  }, {});
};
