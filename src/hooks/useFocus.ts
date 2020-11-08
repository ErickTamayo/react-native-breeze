import { useMemo, useCallback, useState } from "react";
import { ReactNativeStyle, MediaStyle } from "../helpers/styles";

const useFocus = (): {
  getFocusStyle: (style: MediaStyle) => ReactNativeStyle;
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

  const getFocusStyle = useCallback(
    (style: MediaStyle) => (isHovered ? style.focus || {} : {}),
    [isHovered]
  );

  return { getFocusStyle, handleOnFocus, handleOnBlur };
};

export default useFocus;
