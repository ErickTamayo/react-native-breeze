import { useCallback } from "react";
import { Platform } from "react-native";
import { mergeObjects } from "../helpers/objects";
import { BreezeStyle, PlatformStyle } from "../helpers/styles";

const usePlatform = (): ((style: BreezeStyle) => PlatformStyle) => {
  return useCallback((style: BreezeStyle) => {
    const isNative = Platform.OS === "android" || Platform.OS === "ios";

    const defaultStyles = style.default || {};
    const osStyles = style[Platform.OS] || {};
    const nativeStyles = isNative ? style.native || {} : {};

    return mergeObjects([
      defaultStyles,
      nativeStyles,
      osStyles,
    ]) as PlatformStyle;
  }, []);
};

export default usePlatform;
