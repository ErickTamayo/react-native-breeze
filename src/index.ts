import merge from "deepmerge";
import isPlainObject from "is-plain-object";
import { StyleProp, ViewStyle, ImageStyle, TextStyle } from "react-native";

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

type ValueType = string | number | undefined;

br.value = <T extends ValueType>(
  stylesArray: TemplateStringsArray,
  ...variables: string[]
): T => {
  emitError();
  return undefined as any;
};

export const mergeStyles = (styles: any[]) => {
  return merge.all(styles, { isMergeableObject: isPlainObject as any });
};
