import { useMemo } from "react";
import { useWindowDimensions } from "react-native";
import { MediaStyle, VariantsStyle } from "../plugin/helpers/styles";
import { mergeObjects } from "../helpers/objects";

export const useMediaStyle = (style: MediaStyle): VariantsStyle => {
  const { width } = useWindowDimensions();

  return useMemo(() => {
    const allStyle = style.all || {};
    const screenSizes = Object.keys(style)
      .filter((key) => key !== "all")
      .map(Number)
      .sort((a, b) => a - b);

    if (!screenSizes.length) {
      return allStyle;
    }

    const minMatchingSize = screenSizes.find((size) => size >= width);

    if (!minMatchingSize) {
      return allStyle;
    }

    return mergeObjects([allStyle, style[minMatchingSize]]);
  }, [style, width]);
};
