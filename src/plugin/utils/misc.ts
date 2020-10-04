export const withNegativePrefix = (
  negative: string | undefined,
  key: string
) => {
  return `${negative || ""}${key}`;
};

export const colorToKey = (color: string) => {
  return ["colors", ...color.split("-").filter(Boolean)];
};
