import merge from "deepmerge";
import { isPlainObject } from "is-plain-object";

export const mergeObjects = (styles: any[]) => {
  return merge.all(styles, { isMergeableObject: isPlainObject as any });
};
