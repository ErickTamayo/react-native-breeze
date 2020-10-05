import { ImageStyle, StyleProp, TextStyle, ViewStyle } from "react-native";
import Config from "../utils/config";

export type PatternCallable = ({
  theme,
}: {
  theme: typeof Config.theme;
}) => RegExp;

export type PluginPattern = RegExp | PatternCallable;

export type PluginFunctionParams<T> = {
  input: string;
  groups: T;
  theme: typeof Config.theme;
};

export type PluginFunctionReturnType =
  | StyleProp<ViewStyle>
  | StyleProp<ImageStyle>
  | StyleProp<TextStyle>;

export type PluginFunction<T = {}> = (
  params: PluginFunctionParams<T>
) => PluginFunctionReturnType;
