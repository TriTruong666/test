import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

export const TopUserContributorChart = ({ topContributors }) => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "donut",
    },
    labels: [],
    colors: ["#FF4500", "#32CD32", "#1E90FF", "#FFD700", "#FF6347"], // Adjust colors as needed
    tooltip: {
      enabled: true,
      theme: "dark",
    },
  });

  const [chartSeries, setChartSeries] = useState([]);

  useEffect(() => {
    if (topContributors && topContributors.length > 0) {
      const labels = topContributors.map(
        (contributor) => contributor.firstName
      );
      const series = topContributors.map((contributor) => contributor.count);

      setChartOptions((prevOptions) => ({
        ...prevOptions,
        labels,
      }));

      setChartSeries(series);
    }
  }, [topContributors]);

  return (
    <>
      <strong>Top User blogs</strong>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="donut"
        width="100%"
        height="350"
      />
    </>
  );
};
