export const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const randomString = (length = 6) => {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  return Array.from({ length }, () => chars[randomInt(0, chars.length - 1)]).join('');
};

export const randomDigits = (length: number) =>
  Array.from({ length }, () => randomInt(0, 9).toString()).join('');

export const randomChoice = <T>(items: readonly T[]): T => items[randomInt(0, items.length - 1)];
