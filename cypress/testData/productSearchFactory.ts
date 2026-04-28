import { randomChoice } from './random';

export const getSearchQuery = (): string => {
  const queries = ['Dress', 'Top', 'Tshirt', 'Jeans', 'Saree'];
  return randomChoice(queries);
};
