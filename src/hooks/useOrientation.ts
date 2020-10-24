import { useCallback, useEffect, useState } from "react";
import { ReactNativeStyle, VariantsStyle } from "../plugin/helpers/styles";
import { Dimensions, Platform } from "react-native";

const useOrientation = (style: VariantsStyle): ReactNativeStyle => {
  const isMobile = ["ios", "android"].includes(Platform.OS);

  const getOrientation = useCallback(():
    | "landscape"
    | "portrait"
    | undefined => {
    if (!isMobile) return;

    const { height, width } = Dimensions.get("screen");

    return height > width ? "portrait" : "landscape";
  }, [style]);

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
  }, [style, getOrientation, setOrientation, isMobile]);

  return orientation ? style[orientation] || {} : {};
};

export default useOrientation;
