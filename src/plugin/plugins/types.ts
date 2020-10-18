import { ImageStyle, StyleProp, TextStyle, ViewStyle } from "react-native";
import { keys, colorKeys, theme, color } from "../config";

type PatterCallableParams = {
  keys: typeof keys;
  colorKeys: typeof colorKeys;
};

export type PatternCallable = (params: PatterCallableParams) => RegExp;

export type PluginPattern = RegExp | PatternCallable;

export type PluginFunctionParams<T> = {
  input: string;
  groups: T;
  theme: typeof theme;
  color: typeof color;
};

export type PluginFunctionReturnType =
  | StyleProp<ViewStyle>
  | StyleProp<ImageStyle>
  | StyleProp<TextStyle>;

export type PluginFunction<T = {}> = (
  params: PluginFunctionParams<T>
) => PluginFunctionReturnType;
