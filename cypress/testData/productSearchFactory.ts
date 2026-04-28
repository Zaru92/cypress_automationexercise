import { randomChoice } from './random';

export const getRandomProductSearchQuery = (): string => {
  const queries = ['Dress', 'Top', 'Tshirt', 'Jeans', 'Saree'];
  return randomChoice(queries);
};
