import { randomChoice } from './random';

type CategoryData = {
  category: string;
  subcategory: string;
};

const categories: CategoryData[] = [
  { category: 'Women', subcategory: 'Dress' },
  { category: 'Women', subcategory: 'Tops' },
  { category: 'Women', subcategory: 'Saree' },
  { category: 'Men', subcategory: 'Tshirts' },
  { category: 'Men', subcategory: 'Jeans' },
  { category: 'Kids', subcategory: 'Dress' },
  { category: 'Kids', subcategory: 'Tops & Shirts' },
];

export const getRandomCategoryData = (excludedCategory?: CategoryData): CategoryData => {
  const availableCategories = excludedCategory
    ? categories.filter(({ category }) => category !== excludedCategory.category)
    : categories;

  return randomChoice(availableCategories);
};
