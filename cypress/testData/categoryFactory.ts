import { randomChoice } from './random';

type CategorySelection = {
  category: string;
  subcategory: string;
};

const categories: CategorySelection[] = [
  { category: 'Women', subcategory: 'Dress' },
  { category: 'Women', subcategory: 'Tops' },
  { category: 'Women', subcategory: 'Saree' },
  { category: 'Men', subcategory: 'Tshirts' },
  { category: 'Men', subcategory: 'Jeans' },
  { category: 'Kids', subcategory: 'Dress' },
  { category: 'Kids', subcategory: 'Tops & Shirts' },
];

export const getRandomCategorySelection = (
  excludedCategory?: CategorySelection,
): CategorySelection => {
  const availableCategories = excludedCategory
    ? categories.filter(({ category }) => category !== excludedCategory.category)
    : categories;

  return randomChoice(availableCategories);
};
