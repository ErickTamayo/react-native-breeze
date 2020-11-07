import { useCallback } from "react";
import { mergeObjects } from "../helpers/objects";
import useStyles from "./useStyles";
import useMedia from "./useMedia";
import useFocus from "./useFocus";
import useHover from "./useHover";
import useOrientation from "./useOrientation";
import usePlatform from "./usePlatform";

const useBreeze = () => {
  const getBreezeStyles = useStyles();

  const getPlatformStyles = usePlatform();

  const getMediaStyles = useMedia();

  const getOrientationStyles = useOrientation();

  const { getHoverStyles, handleOnMouseEnter, handleOnMouseLeave } = useHover();

  const { getFocusStyle, handleOnFocus, handleOnBlur } = useFocus();

  const parse = useCallback(
    (input: string) => {
      const breezeStyle = getBreezeStyles(input);
      const PlatformStyle = getPlatformStyles(breezeStyle);
      const variantStyle = getMediaStyles(PlatformStyle);

      const baseStyle = variantStyle.base || {};
      const orientedStyle = getOrientationStyles(variantStyle);
      const hoveredStyle = getHoverStyles(variantStyle);
      const focusedStyle = getFocusStyle(variantStyle);

      return mergeObjects([
        baseStyle,
        orientedStyle,
        hoveredStyle,
        focusedStyle,
      ]);
    },
    [
      getBreezeStyles,
      getPlatformStyles,
      getMediaStyles,
      getOrientationStyles,
      getHoverStyles,
      getFocusStyle,
    ]
  );

  return {
    parse,
    handleOnMouseEnter,
    handleOnMouseLeave,
    handleOnFocus,
    handleOnBlur,
  };
};

export default useBreeze;
