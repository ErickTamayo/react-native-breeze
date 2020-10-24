import { useMemo } from "react";
import { BreezeStyle } from "../plugin/helpers/styles";
import { mergeObjects } from "../helpers/objects";
import useMediaStyle from "./useMediaStyle";
import useBreezeStyle from "./useBreezeStyle";
import useFocus from "./useFocus";
import useHover from "./useHover";
import useOrientation from "./useOrientation";

export const useBreeze = (breezeStyle: BreezeStyle) => {
  const mediaStyle = useBreezeStyle(breezeStyle);

  const variantStyle = useMediaStyle(mediaStyle);

  const orientationStyle = useOrientation(variantStyle);

  const { hoverStyle, handleOnMouseEnter, handleOnMouseLeave } = useHover(
    variantStyle
  );

  const { focusStyle, handleOnFocus, handleOnBlur } = useFocus(variantStyle);

  const style = useMemo(
    () =>
      mergeObjects([
        variantStyle.base || {},
        orientationStyle,
        hoverStyle,
        focusStyle,
      ]),
    [variantStyle, orientationStyle, hoverStyle, focusStyle]
  );

  return {
    style,
    handleOnMouseEnter,
    handleOnMouseLeave,
    handleOnFocus,
    handleOnBlur,
  };
};
