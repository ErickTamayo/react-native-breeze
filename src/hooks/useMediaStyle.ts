import { useMemo } from "react";
import { useWindowDimensions } from "react-native";
import { MediaStyle, VariantsStyle } from "../plugin/helpers/styles";
import { mergeObjects } from "../helpers/objects";

const useMediaStyle = (style: MediaStyle): VariantsStyle => {
  const { width } = useWindowDimensions();

  return useMemo(() => {
    const allStyle = style.all || {};
    const screenSizes = Object.keys(style)
      .filter((key) => key !== "all")
      .map(Number)
      .sort((a, b) => a - b)
      .reverse();

    if (screenSizes.length === 0) {
      return allStyle;
    }

    const maxMatchingSize = screenSizes.find((size) => size <= width);

    if (!maxMatchingSize) {
      return allStyle;
    }

    // Merge all the sizes that are less than the maxMatchingSize
    const matchingStyles = screenSizes.reduce<VariantsStyle[]>((acc, size) => {
      return size <= maxMatchingSize ? [...acc, style[size]] : acc;
    }, []);

    return mergeObjects([allStyle, ...matchingStyles.reverse()]);
  }, [style, width]);
};

export default useMediaStyle;
