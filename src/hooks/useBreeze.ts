import { BreezeStyle } from "../plugin/helpers/styles";
import { useMediaStyle } from "./useMediaStyle";
import { useBreezeStyle } from "./useBreezeStyle";

export const useBreeze = (breezeStyle: BreezeStyle) => {
  const mediaStyle = useBreezeStyle(breezeStyle);
  const variantStyle = useMediaStyle(mediaStyle);
  // const { hoverStyle, onMouseEnter, onMouseLeave } = useHover(variantStyle);
  // const { focusStyle, onFocus, onBlur } = useFocus(variantStyle);
  // const style = useCombineStyles(variantStyle, hoverStyle, focusStyle);

  // return { style: variantStyle, onMouseEnter, onMouseLeave, onFocus, onBlur };
  return { style: variantStyle };
};
