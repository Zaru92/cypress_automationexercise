import { randomChoice } from './random';

type BrandData = {
  brand: string;
};

const brands: BrandData[] = [
  { brand: 'Polo' },
  { brand: 'H&M' },
  { brand: 'Madame' },
  { brand: 'Mast & Harbour' },
  { brand: 'Babyhug' },
  { brand: 'Allen Solly Junior' },
  { brand: 'Kookie Kids' },
  { brand: 'Biba' },
];

export const getRandomBrand = (excludedBrand?: BrandData): BrandData => {
  const availableBrands = excludedBrand
    ? brands.filter(({ brand }) => brand !== excludedBrand.brand)
    : brands;

  return randomChoice(availableBrands);
};
