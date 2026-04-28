import { randomDigits, randomInt } from './random';

export type CardPaymentDetails = {
  nameOnCard: string;
  cardNumber: string;
  cvc: string;
  expirationMonth: string;
  expirationYear: string;
};

const padToTwoDigits = (value: number) => value.toString().padStart(2, '0');

export const createRandomCardPaymentDetails = (): CardPaymentDetails => {
  const stamp = `${Date.now()}`.slice(-6);

  return {
    nameOnCard: `QA Test ${stamp}`,
    cardNumber: randomDigits(16),
    cvc: randomDigits(3),
    expirationMonth: padToTwoDigits(randomInt(1, 12)),
    expirationYear: `${randomInt(new Date().getFullYear() + 1, new Date().getFullYear() + 6)}`,
  };
};
