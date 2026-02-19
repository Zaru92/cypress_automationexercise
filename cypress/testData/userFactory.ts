// cypress/testData/userFactory.ts

export type MonthName =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type User = {
  name: string;
  email: string;
  password: string;

  title: 'Mr' | 'Mrs';
  dob: { day: string; month: MonthName; year: string };

  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobile: string;
};

const pad2 = (n: number) => n.toString().padStart(2, '0');

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const randomString = (len = 6) => {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  return Array.from({ length: len }, () => chars[randomInt(0, chars.length - 1)]).join('');
};

const MONTHS: MonthName[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const randomMonthName = (): MonthName => MONTHS[randomInt(0, MONTHS.length - 1)];

export const createRandomUser = (): User => {
  const stamp = `${Date.now()}-${randomInt(1000, 9999)}`;

  const firstName = `Michal${randomString(3)}`;
  const lastName = `Test${randomString(3)}`;

  const day = String(randomInt(1, 28));
  const month = randomMonthName();
  const year = `${randomInt(1985, 2002)}`;

  return {
    name: firstName,
    email: `qa.${stamp}@example.com`,
    password: `P@ssw0rd!${randomInt(10, 99)}`,

    title: Math.random() > 0.5 ? 'Mr' : 'Mrs',
    dob: { day, month, year },

    firstName,
    lastName,
    company: `Portfolio QA ${randomString(4)}`,
    address1: `${randomInt(1, 99)} Test Street`,
    address2: `Apt ${randomInt(1, 20)}`,
    country: 'Canada',
    state: `State-${randomString(5)}`,
    city: `City-${randomString(5)}`,
    zipcode: `${randomInt(10000, 99999)}`,
    mobile: `+48${randomInt(500000000, 999999999)}`,
  };
};
