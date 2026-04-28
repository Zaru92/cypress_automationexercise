import { randomInt, randomString } from './random';

export type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export const createRandomContactFormData = (): ContactFormData => {
  const stamp = `${Date.now()}-${randomInt(1000, 9999)}`;
  return {
    name: `QA ${randomString(4)}`,
    email: `qa.contact.${stamp}@example.com`,
    subject: `Contact subject ${randomString(5)}`,
    message: `Hello! This is an automated message: ${stamp}\nLine 2: ${randomString(10)}\nLine 3: ${randomString(12)}.`,
  };
};
