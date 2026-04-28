import { randomDigits, randomInt } from './random';

export type PaymentDetails = {
  nameOnCard: string;
  cardNumber: string;
  cvc: string;
  expirationMonth: string;
  expirationYear: string;
};

const pad2 = (value: number) => value.toString().padStart(2, '0');

export const createRandomPaymentDetails = (): PaymentDetails => {
  const stamp = `${Date.now()}`.slice(-6);

  return {
    nameOnCard: `QA Test ${stamp}`,
    cardNumber: randomDigits(16),
    cvc: randomDigits(3),
    expirationMonth: pad2(randomInt(1, 12)),
    expirationYear: `${randomInt(new Date().getFullYear() + 1, new Date().getFullYear() + 6)}`,
  };
};
