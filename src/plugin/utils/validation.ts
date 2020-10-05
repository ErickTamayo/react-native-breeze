export const validate = (input: string, value: any, type: string[]) => {
  const isValid = type.some((t) => typeof value === t);

  if (!isValid) {
    console.error(`Invalid value [${typeof value}] for "${input}" style`);
  }

  return isValid;
};
