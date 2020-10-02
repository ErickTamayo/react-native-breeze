import { ComponentType } from "react";
import { StyleProp } from "react-native";

export type BreezeProps<P, O extends keyof P> = {
  [key in O]?: StyleProp<string & P[O]>;
} &
  Omit<P, O>;

export const withBreeze = <P extends object, O extends keyof P>(
  component: ComponentType<P>,
  styleKeys: O[] // TODO fix typungs and stuff
): ComponentType<BreezeProps<P, O>> =>
  component as ComponentType<BreezeProps<P, O>>;
