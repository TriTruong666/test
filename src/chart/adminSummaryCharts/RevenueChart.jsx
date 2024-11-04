import React, { useMemo, useState } from "react";
import Chart from "react-apexcharts";

export const RevenueChart = ({ orders }) => {
  const [timeRange, setTimeRange] = useState("day");

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);

  const formatDate = (date) => {
    switch (timeRange) {
      case "day":
        return date.toLocaleDateString();
      case "month":
        return `${date.getMonth() + 1}-${date.getFullYear()}`;
      case "year":
        return date.getFullYear().toString();
      default:
        return date.toLocaleDateString();
    }
  };

  // Process data to get revenue based on the selected time range
  const chartData = useMemo(() => {
    const filteredData = orders.reduce((acc, order) => {
      const orderDate = new Date(order.order.createDate);
      const formattedDate = formatDate(orderDate);

      if (!acc[formattedDate]) {
        acc[formattedDate] = {
          revenue: 0,
          totalOrders: 0,
        };
      }

      acc[formattedDate].revenue += order.order.total;
      acc[formattedDate].totalOrders += 1;
      return acc;
    }, {});

    return Object.entries(filteredData)
      .map(([date, { revenue, totalOrders }]) => ({
        date,
        revenue: parseFloat(revenue.toFixed(2)),
        totalOrders: parseInt(totalOrders, 10),
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [orders, timeRange]);

  const chartOptions = {
    chart: {
      type: "area",
      id: "revenue-chart",
      toolbar: { show: false },
      animations: { enabled: true, easing: "easeinout", speed: 800 },
    },
    xaxis: {
      categories: chartData.map((data) => data.date),
    },
    colors: ["#00E396", "#0090FF"],
    stroke: { curve: "smooth", width: 2 },
    grid: { borderColor: "#f1f1f1" },
    tooltip: { enabled: true, theme: "dark" },
    dataLabels: { enabled: false },
    yaxis: [
      { title: { text: "Revenue" } },
      { opposite: true, title: { text: "Total Orders" } },
    ],
  };

  const chartSeries = [
    { name: "Revenue", data: chartData.map((data) => data.revenue) },
    { name: "Total Orders", data: chartData.map((data) => data.totalOrders) },
  ];

  return (
    <>
      <h3>Revenue and Total Orders</h3>
      <div className="filter-container">
        <label>View by: </label>
        <select
          onChange={(e) => setTimeRange(e.target.value)}
          value={timeRange}
        >
          <option value="day">Day</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
      </div>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="area"
        width="100%"
        height="300"
      />
    </>
  );
};
