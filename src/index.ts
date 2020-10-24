import merge from "deepmerge";
import { isPlainObject } from "is-plain-object";
import { StyleProp, ViewStyle, ImageStyle, TextStyle } from "react-native";
export { useBreeze } from "./hooks";

let warningEmitted = false;

const emitError = () => {
  if (!warningEmitted) {
    console.error(
      "react-native-breeze could not apply the style or get the style value. Perhaps you missed setting up the babel plugin?"
    );
    warningEmitted = true;
  }
};

type BreezeStyle =
  | StyleProp<ViewStyle>
  | StyleProp<ImageStyle>
  | StyleProp<TextStyle>;

export const br = (
  stylesArray: TemplateStringsArray,
  ...variables: string[]
): BreezeStyle => {
  emitError();
  return {};
};

br.value = (stylesArray: TemplateStringsArray, ...variables: string[]): any => {
  emitError();
  return undefined as any;
};

br.raw = (stylesArray: TemplateStringsArray, ...variables: string[]): any => {
  emitError();
  return undefined as any;
};

export const mergeStyles = (styles: any[]) => {
  return merge.all(styles, { isMergeableObject: isPlainObject as any });
};
