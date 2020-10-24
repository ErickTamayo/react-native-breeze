import { useMemo, useCallback, useState } from "react";
import { ReactNativeStyle, VariantsStyle } from "../plugin/helpers/styles";

const useHover = (
  style: VariantsStyle
): {
  hoverStyle: ReactNativeStyle;
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

  const hoverStyle = useMemo(() => (isHovered ? style.hover || {} : {}), [
    style,
    isHovered,
  ]);

  return { hoverStyle, handleOnMouseEnter, handleOnMouseLeave };
};

export default useHover;
