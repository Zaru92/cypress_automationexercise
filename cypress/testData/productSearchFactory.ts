export const getSearchQuery = (): string => {
  const queries = ['Dress', 'Top', 'Tshirt', 'Jeans', 'Saree'];
  return queries[Math.floor(Math.random() * queries.length)];
};
