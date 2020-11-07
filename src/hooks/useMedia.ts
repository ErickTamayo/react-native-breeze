import { useCallback } from "react";
import { useWindowDimensions } from "react-native";
import { PlatformStyle, MediaStyle } from "../helpers/styles";
import { mergeObjects } from "../helpers/objects";

const useMedia = (): ((style: PlatformStyle) => MediaStyle) => {
  const { width } = useWindowDimensions();

  return useCallback(
    (style: PlatformStyle) => {
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
      const matchingStyles = screenSizes.reduce<MediaStyle[]>((acc, size) => {
        return size <= maxMatchingSize ? [...acc, style[size]] : acc;
      }, []);

      return mergeObjects([allStyle, ...matchingStyles.reverse()]);
    },
    [width]
  );
};

export default useMedia;
