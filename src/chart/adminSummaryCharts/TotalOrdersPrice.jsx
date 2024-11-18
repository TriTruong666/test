import React from "react";
import Chart from "react-apexcharts";

export const TotalOrdersPrice = ({ orders }) => {
  // Helper function to group orders by date and sum totals
  const getDailyTotals = () => {
    const dailyTotals = {};

    // Grouping orders by date
    orders.forEach((order) => {
      const dateKey = new Date(order.order.createDate).toLocaleDateString(
        "en-US",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }
      );
      dailyTotals[dateKey] = (dailyTotals[dateKey] || 0) + order.order.total;
    });

    // Convert grouped data into sorted arrays
    const sortedDates = Object.keys(dailyTotals).sort(
      (a, b) => new Date(a) - new Date(b)
    );

    return {
      dates: sortedDates,
      totals: sortedDates.map((date) => dailyTotals[date]),
    };
  };

  const { dates, totals } = getDailyTotals();

  const options = {
    chart: {
      type: "line",
      height: 350,
      zoom: {
        enabled: false,
      },
    },
    title: {
      text: "Total Orders Price",
      align: "center",
    },
    xaxis: {
      categories: dates,
      title: {
        text: "Date (Day/Month/Year)",
      },
    },
    yaxis: {
      title: {
        text: "Total Money",
      },
      labels: {
        formatter: (value) => `$${value.toFixed(2)}`,
      },
    },
    stroke: {
      curve: "smooth",
    },
    tooltip: {
      x: {
        format: "dd/MM/yyyy",
      },
    },
  };

  const series = [
    {
      name: "Total Money",
      data: totals,
    },
  ];

  return (
    <>
      <Chart
        options={options}
        series={series}
        type="line"
        width="100%"
        height={350}
      />
    </>
  );
};
