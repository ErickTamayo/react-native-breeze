import { StyleProp, ViewStyle, ImageStyle, TextStyle } from "react-native";

type Breeze =
  | StyleProp<ViewStyle>
  | StyleProp<ImageStyle>
  | StyleProp<TextStyle>;

export const br = (
  stylesArray: TemplateStringsArray,
  ...variables: string[]
): Breeze => ({});
