import { useMemo, useCallback, useState } from "react";
import { ReactNativeStyle, VariantsStyle } from "../plugin/helpers/styles";

const useHover = (
  style: VariantsStyle,
  onMouseEnter?: (e: any) => void,
  onMouseLeave?: (e: any) => void
): {
  hoverStyle: ReactNativeStyle;
  handleOnMouseEnter: (e: any) => void;
  handleOnMouseLeave: (e: any) => void;
} => {
  const [isHovered, setIsHovered] = useState(false);

  const handleOnMouseEnter = useCallback(
    (e) => {
      onMouseEnter?.(e);
      setIsHovered(true);
    },
    [style, onMouseEnter]
  );

  const handleOnMouseLeave = useCallback(
    (e) => {
      onMouseLeave?.(e);
      setIsHovered(false);
    },
    [onMouseLeave]
  );

  const hoverStyle = useMemo(() => (isHovered ? style.hover || {} : {}), [
    style,
    isHovered,
  ]);

  return { hoverStyle, handleOnMouseEnter, handleOnMouseLeave };
};

export default useHover;
