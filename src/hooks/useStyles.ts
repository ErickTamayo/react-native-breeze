import { useCallback } from "react";
import { BreezeStyle, generateStyleFromInput } from "../helpers/styles";

const useStyles = (): ((input: string) => BreezeStyle) => {
  return useCallback((input: string) => {
    return generateStyleFromInput(input);
  }, []);
};

export default useStyles;
