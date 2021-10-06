export const pluralize = function (value: string, amount: number): string {
  return amount === 1 ? value : `${value}s`;
};
