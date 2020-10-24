import memoize from "fast-memoize";

export const flattenObject = memoize(
  (
    obj: any,
    prefix: string = ""
  ): {
    [key: string]: any;
  } => {
    const flattened = Object.keys(obj).reduce((acc, key) => {
      const newKey = prefix ? `${prefix}-${key}` : key;

      if (typeof obj[key] === "object") {
        return { ...acc, ...flattenObject(obj[key], newKey) };
      }

      return { ...acc, [newKey]: obj[key] };
    }, {});

    return flattened;
  },
  { strategy: memoize.strategies.variadic }
);

export const toJson = (obj: any) =>
  JSON.stringify(obj).replace(/\"([^(\")"]+)\":/g, "$1:");
