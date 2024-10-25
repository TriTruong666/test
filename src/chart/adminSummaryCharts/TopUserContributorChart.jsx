import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

export const TopUserContributorChart = ({ blogs }) => {
  const [chartOptions, setChartOptions] = useState({
    chart: { type: "donut" },
    labels: [],
    colors: ["#FF4500", "#32CD32", "#1E90FF", "#FFD700", "#FF6347"],
    tooltip: { enabled: true, theme: "dark" },
  });
  
  const [chartSeries, setChartSeries] = useState([]);

  useEffect(() => {
    if (blogs && blogs.length > 0) {
      const userContributions = blogs.reduce((acc, blog) => {
        acc[blog.fullname] = (acc[blog.fullname] || 0) + 1;
        return acc;
      }, {});

      const topContributors = Object.entries(userContributions)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([fullname, count]) => {
          const firstName = fullname.split(" ")[0];
          return { firstName, count };
        });

      const labels = topContributors.map((contributor) => contributor.firstName);
      const series = topContributors.map((contributor) => contributor.count);

      setChartOptions((prevOptions) => ({ ...prevOptions, labels }));
      setChartSeries(series);
    }
  }, [blogs]);

  return (
    <>
      <strong>Top User Blogs</strong>
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
