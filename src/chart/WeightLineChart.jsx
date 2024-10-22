import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";

export const WeightLineChart = ({ koiGrowthLogs }) => {
  const [formattedData, setFormattedData] = useState([]);
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "line",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: ["#581845"],
    xaxis: {
      categories: [], // This will hold the formatted dates
    },
    yaxis: {
      title: {
        text: "Weight (kg)", // Assuming the weight is in kg
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    tooltip: {
      theme: "dark",
      x: {
        format: "dd MMM yyyy",
      },
    },
    markers: {
      size: 4,
    },
  });

  useEffect(() => {
    if (koiGrowthLogs && koiGrowthLogs.length > 0) {
      const data = koiGrowthLogs.slice(Math.max(koiGrowthLogs.length - 10, 0));

      const formatted = {
        dates: data.map((log) =>
          new Date(log.koiLogDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        ),
        weights: data.map((log) => log.weight),
      };

      setFormattedData(formatted.weights);
      setChartOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: {
          categories: formatted.dates,
        },
      }));
    }
  }, [koiGrowthLogs]);

  const series = [
    {
      name: "Weight",
      data: formattedData,
    },
  ];

  return (
    <div>
      <ApexCharts
        options={chartOptions}
        series={series}
        type="line"
        width="100%"
        height={300}
      />
    </div>
  );
};
