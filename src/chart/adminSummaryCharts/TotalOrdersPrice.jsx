import React from "react";
import Chart from "react-apexcharts";

export const TotalOrdersPrice = ({ orders }) => {
  const dates = orders.map((order) =>
    new Date(order.order.createDate).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
    })
  );
  const totals = orders.map((order) => order.order.total);

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
        text: "Date (Day/Month)",
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
