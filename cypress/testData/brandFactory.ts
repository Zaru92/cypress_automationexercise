import { randomChoice } from './random';

type BrandSelection = {
  brand: string;
};

const brands: BrandSelection[] = [
  { brand: 'Polo' },
  { brand: 'H&M' },
  { brand: 'Madame' },
  { brand: 'Mast & Harbour' },
  { brand: 'Babyhug' },
  { brand: 'Allen Solly Junior' },
  { brand: 'Kookie Kids' },
  { brand: 'Biba' },
];

export const getRandomBrand = (excludedBrand?: BrandSelection): BrandSelection => {
  const availableBrands = excludedBrand
    ? brands.filter(({ brand }) => brand !== excludedBrand.brand)
    : brands;

  return randomChoice(availableBrands);
};
