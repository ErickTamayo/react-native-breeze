export const withNegativePrefix = (
  negative: string | undefined,
  key: string
) => {
  return `${negative || ""}${key}`;
};

export const negative = (obj: { [key: string]: number }) => {
  return Object.keys(obj).reduce((acc, key) => {
    return { ...acc, [`-${key}`]: obj[key] * -1 };
  }, {});
};
