import { ImageStyle, StyleProp, TextStyle, ViewStyle } from "react-native";
import Config from "../utils/config";

type PatterCallableParams = {
  keys: typeof Config.keys;
};

export type PatternCallable = (params: PatterCallableParams) => RegExp;

export type PluginPattern = RegExp | PatternCallable;

export type PluginFunctionParams<T> = {
  input: string;
  groups: T;
  theme: typeof Config.theme;
  color: typeof Config.color;
};

export type PluginFunctionReturnType =
  | StyleProp<ViewStyle>
  | StyleProp<ImageStyle>
  | StyleProp<TextStyle>;

export type PluginFunction<T = {}> = (
  params: PluginFunctionParams<T>
) => PluginFunctionReturnType;
