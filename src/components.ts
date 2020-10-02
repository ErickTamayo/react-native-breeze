import * as ReactNative from "react-native";
import { withBreeze } from "./withBreeze";

export const View = withBreeze(ReactNative.View, ["style"]);
export const Text = withBreeze(ReactNative.Text, ["style"]);
export const Image = withBreeze(ReactNative.Image, ["style"]);
export const TextInput = withBreeze(ReactNative.TextInput, ["style"]);
export const ScrollView = withBreeze(ReactNative.ScrollView, ["style"]);
