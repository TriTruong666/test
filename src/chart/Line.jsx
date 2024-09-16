import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { faker } from "@faker-js/faker"; // Use faker.js for fake data generation

// Generate fake data
const generateFakeData = () => {
  const data = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      date: faker.date.recent(10).toLocaleDateString(),
      weight: faker.number.float({ min: 1, max: 10, precision: 0.1 }),
      size: faker.number.float({ min: 10, max: 50, precision: 0.1 }),
    });
  }
  return data;
};

const fakeData = generateFakeData();

export const LineGraph = () => {
  return (
    <ResponsiveContainer width={400} height={300}>
      <LineChart data={fakeData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="weight"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="size" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};
