import { ViewProps, ImageProps, TextProps } from "react-native";
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
  | ViewProps["style"]
  | ImageProps["style"]
  | TextProps["style"];

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
