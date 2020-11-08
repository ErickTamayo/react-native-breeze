import { useMemo, useCallback, useState } from "react";
import { ReactNativeStyle, MediaStyle } from "../helpers/styles";

const useHover = (): {
  getHoverStyles: (style: MediaStyle) => ReactNativeStyle;
  handleOnMouseEnter: (onMouseEnter?: any) => (e: any) => void;
  handleOnMouseLeave: (onMouseLeave?: any) => (e: any) => void;
} => {
  const [isHovered, setIsHovered] = useState(false);

  const handleOnMouseEnter = useCallback(
    (onMouseEnter?: any) => (e: any) => {
      onMouseEnter?.(e);
      setIsHovered(true);
    },
    [setIsHovered]
  );

  const handleOnMouseLeave = useCallback(
    (onMouseLeave?: any) => (e: any) => {
      onMouseLeave?.(e);
      setIsHovered(false);
    },
    [setIsHovered]
  );

  const getHoverStyles = useCallback(
    (style: MediaStyle) => (isHovered ? style.hover || {} : {}),
    [isHovered]
  );

  return { getHoverStyles, handleOnMouseEnter, handleOnMouseLeave };
};

export default useHover;
