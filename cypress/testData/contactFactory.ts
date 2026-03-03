export type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const randomString = (len = 6) => {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  return Array.from({ length: len }, () => chars[randomInt(0, chars.length - 1)]).join('');
};

export const createRandomContactMessage = (): ContactMessage => {
  const stamp = `${Date.now()}-${randomInt(1000, 9999)}`;
  return {
    name: `QA ${randomString(4)}`,
    email: `qa.contact.${stamp}@example.com`,
    subject: `Contact subject ${randomString(5)}`,
    message: `Hello! This is an automated message: ${stamp}\nLine 2: ${randomString(10)}\nLine 3: ${randomString(12)}.`,
  };
};
