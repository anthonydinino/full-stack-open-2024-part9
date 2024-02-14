export const isANumber = (num: unknown) => {
  return !isNaN(Number(num));
};

export const isArrayNumbers = (arr: string[]) => {
  return arr.every((n) => isANumber(n));
};
