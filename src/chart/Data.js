import { Faker } from "@faker-js/faker/.";

const generateFakeData = () => {
  const data = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      date: Faker.date.recent(10).toLocaleDateString(), // Fake dates within the last 10 days
      weight: Faker.datatype.float({ min: 1, max: 10, precision: 0.1 }), // Fake weight in kg
      size: Faker.datatype.float({ min: 10, max: 50, precision: 0.1 }), // Fake size in cm
    });
  }
  return data;
};

const fakeData = generateFakeData();
