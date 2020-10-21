import { BreezeStyle } from "../plugin/helpers/styles";
import useMediaStyle from "./useMediaStyle";
import useBreezeStyle from "./useBreezeStyle";
import useHover from "./useHover";
import { mergeObjects } from "../helpers/objects";
import { useMemo } from "react";

export const useBreeze = (
  breezeStyle: BreezeStyle,
  onMouseEnter?: any,
  onMouseLeave?: any
) => {
  const mediaStyle = useBreezeStyle(breezeStyle);
  const variantStyle = useMediaStyle(mediaStyle);

  // const { orientationStyle } = useOrientation(variantStyle);
  const { hoverStyle, handleOnMouseEnter, handleOnMouseLeave } = useHover(
    variantStyle,
    onMouseEnter,
    onMouseLeave
  );

  // const { focusStyle, onFocus, onBlur } = useFocus(variantStyle);

  const style = useMemo(
    () => mergeObjects([variantStyle.base || {}, hoverStyle]),
    [hoverStyle]
  );

  // return { style: variantStyle, onMouseEnter, onMouseLeave, onFocus, onBlur };
  return { style, handleOnMouseEnter, handleOnMouseLeave };
};
