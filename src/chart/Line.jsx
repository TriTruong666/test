import React, { useEffect, useState } from "react";
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

export const LineGraph = ({ koiGrowthLogs }) => {
  const [formattedData, setFormattedData] = useState([]);

  useEffect(() => {
    if (koiGrowthLogs && koiGrowthLogs.length > 0) {
      const data = koiGrowthLogs.map((log) => ({
        date: new Date(log.koiLogDate).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }), // Format date as "25 Aug 2023"
        weight: log.weight, // Assuming `weight` is in kg
        size: log.size, // Assuming `size` is in cm
      }));
      setFormattedData(data);
    }
  }, [koiGrowthLogs]);
  return (
    <ResponsiveContainer width={400} height={300}>
      <LineChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="weight"
          stroke="#8884d8"
          activeDot={{ r: 12 }}
        />
        <Line type="monotone" dataKey="size" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};
