export const validate = (input: string, value: any, type: string[]) => {
  const types = [
    "undefined",
    "object",
    "boolean",
    "number",
    "bigint",
    "string",
    "symbol",
    "function",
  ];

  const isValid = type.some((t) => {
    if (types.includes(t)) {
      return typeof value === t;
    }

    return t === value;
  });

  if (!isValid) {
    console.error(`Invalid value [${typeof value}] for "${input}" style`);
  }

  return isValid;
};
