import { useCallback, useEffect, useState } from "react";
import { ReactNativeStyle, MediaStyle } from "../helpers/styles";
import { Dimensions, Platform } from "react-native";

const useOrientation = (): ((style: MediaStyle) => ReactNativeStyle) => {
  const isMobile = ["ios", "android"].includes(Platform.OS);

  const getOrientation = useCallback(():
    | "landscape"
    | "portrait"
    | undefined => {
    if (!isMobile) return;

    const { height, width } = Dimensions.get("screen");

    return height > width ? "portrait" : "landscape";
  }, []);

  const [orientation, setOrientation] = useState<
    "landscape" | "portrait" | undefined
  >(getOrientation);

  useEffect(() => {
    if (isMobile) {
      const handleOnChange = () => {
        setOrientation(getOrientation);
      };

      Dimensions.addEventListener("change", handleOnChange);
      return () => {
        Dimensions.removeEventListener("change", handleOnChange);
      };
    }
  }, [getOrientation, setOrientation, isMobile]);

  return useCallback(
    (style: MediaStyle) => {
      return orientation ? style[orientation] || {} : {};
    },
    [orientation]
  );
};

export default useOrientation;
