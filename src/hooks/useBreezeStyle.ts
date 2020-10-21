import { useMemo } from "react";
import { Platform } from "react-native";
import { mergeObjects } from "../helpers/objects";
import { BreezeStyle, MediaStyle } from "../plugin/helpers/styles";

const useBreezeStyle = (breezeStyle: BreezeStyle): MediaStyle =>
  useMemo(() => {
    const isNative = Platform.OS === "android" || Platform.OS === "ios";

    const defaultStyles = breezeStyle.default || {};
    const osStyles = breezeStyle[Platform.OS] || {};
    const nativeStyles = isNative ? breezeStyle.native || {} : {};

    return mergeObjects([defaultStyles, nativeStyles, osStyles]) as MediaStyle;
  }, []);

export default useBreezeStyle;
