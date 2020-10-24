import { useMemo, useCallback, useState } from "react";
import { ReactNativeStyle, VariantsStyle } from "../plugin/helpers/styles";

const useFocus = (
  style: VariantsStyle
): {
  focusStyle: ReactNativeStyle;
  handleOnFocus: (onFocus: any) => (e: any) => void;
  handleOnBlur: (onBlur: any) => (e: any) => void;
} => {
  const [isHovered, setIsHovered] = useState(false);

  const handleOnFocus = useCallback(
    (onFocus: any) => (e: any) => {
      onFocus?.(e);
      setIsHovered(true);
    },
    [setIsHovered]
  );

  const handleOnBlur = useCallback(
    (onBlur: any) => (e: any) => {
      onBlur?.(e);
      setIsHovered(false);
    },
    [setIsHovered]
  );

  const focusStyle = useMemo(() => (isHovered ? style.focus || {} : {}), [
    style,
    isHovered,
  ]);

  return { focusStyle, handleOnFocus, handleOnBlur };
};

export default useFocus;
