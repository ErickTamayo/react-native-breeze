import { ViewProps, ImageProps, TextProps } from "react-native";
export { useBreeze } from "./hooks";
import { generateStyleFromInput } from "./helpers/styles";

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

export const br = (_: TemplateStringsArray, ...__: string[]): BreezeStyle => {
  emitError();
  return {};
};

br.value = (_: TemplateStringsArray, ...__: string[]): any => {
  emitError();
  return undefined as any;
};

br.raw = (_: TemplateStringsArray, ...__: string[]): any => {
  emitError();
  return undefined as any;
};

export const breezeRaw = (input: string) => {
  const styles = generateStyleFromInput(input);
  return styles.default?.all?.base || {};
};

export const breezeValue = (input: string) => {
  const raw = breezeRaw(input);
  return Object.values(raw)[0];
};
