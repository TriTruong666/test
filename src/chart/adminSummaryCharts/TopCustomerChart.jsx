import React from "react";
import Chart from "react-apexcharts";

export const TopCustomerChart = ({ users, orders }) => {
  const getTopCustomers = () => {
    const userPurchases = {};

    const validUsers = users.filter((user) => user.role !== "ADMIN");

    orders.forEach((order) => {
      const { userId } = order.order;
      const totalQuantity = order.order.orderDetails.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      // Add quantities to user if valid
      if (validUsers.some((user) => user.userId === userId)) {
        userPurchases[userId] = (userPurchases[userId] || 0) + totalQuantity;
      }
    });

    // Sort by purchase quantity and select top 5 users
    const topUsers = Object.entries(userPurchases)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([userId, quantity]) => {
        const user = validUsers.find((user) => user.userId === userId);
        const firstName = user?.fullname?.split(" ")[0];
        return {
          name: firstName,
          quantity,
        };
      });

    return {
      names: topUsers.map((user) => user.name),
      quantities: topUsers.map((user) => user.quantity),
    };
  };

  const { names, quantities } = getTopCustomers();

  const chartOptions = {
    chart: {
      id: "top-customers-bar-chart",
      type: "bar",
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    xaxis: {
      categories: names,
      labels: {
        rotate: -45,
        rotateAlways: true,
      },
    },
    yaxis: {
      min: 1,
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (value) => `${value} products bought`,
      },
    },
    title: {
      text: "Top 5 Customers by Products Bought",
      align: "center",
    },
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      bar: {
        // Adjust bar width based on the number of users
        columnWidth: names.length < 5 ? `${100 / names.length}%` : "70%",
      },
    },
  };

  const chartSeries = [
    {
      name: "Products Bought",
      data: quantities,
    },
  ];

  return (
    <Chart
      options={chartOptions}
      series={chartSeries}
      type="bar"
      height="350"
      width="100%"
    />
  );
};
