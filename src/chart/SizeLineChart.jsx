import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";

export const SizeLineChart = ({ koiGrowthLogs }) => {
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
    colors: ["#FFC300"],

    xaxis: {
      categories: [],
    },
    yaxis: {
      title: {
        text: "Size (cm)",
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
        sizes: data.map((log) => log.size),
      };

      setFormattedData(formatted.sizes);
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
      name: "Size",
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
