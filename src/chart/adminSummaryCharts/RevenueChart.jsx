import React, { useMemo } from "react";
import Chart from "react-apexcharts";

export const RevenueChart = ({ orders, users }) => {
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);

  // Process data to get daily revenue, total orders, and new customers
  const chartData = useMemo(() => {
    const dailyData = orders.reduce((acc, order) => {
      const orderDate = new Date(order.order.createDate).toLocaleDateString();
      if (!acc[orderDate]) {
        acc[orderDate] = {
          revenue: 0,
          totalOrders: 0,
          newCustomers: new Set(),
        };
      }
      acc[orderDate].revenue += order.order.total;
      acc[orderDate].totalOrders += 1;
      acc[orderDate].newCustomers.add(order.order.userId);
      return acc;
    }, {});

    return Object.entries(dailyData)
      .map(([date, { revenue, totalOrders, newCustomers }]) => ({
        date,
        revenue,
        totalOrders,
        newCustomers: newCustomers.size,
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [orders]);

  // Configure chart options and series
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
    colors: ["#00E396", "#0090FF", "#FF4560"],
    stroke: { curve: "smooth", width: 2 },
    grid: { borderColor: "#f1f1f1" },
    tooltip: { enabled: true, theme: "dark" },
    dataLabels: { enabled: false },
    yaxis: [
      { title: { text: "Revenue" } },
      { opposite: true, title: { text: "Total Orders / New Customers" } },
    ],
  };

  const chartSeries = [
    { name: "Revenue", data: chartData.map((data) => data.revenue) },
    { name: "Total Orders", data: chartData.map((data) => data.totalOrders) },
    { name: "New Customers", data: chartData.map((data) => data.newCustomers) },
  ];

  return (
    <>
      <h3>Revenue</h3>
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
